import simpleGit from "simple-git";
import semver from "semver";
import dateFormat from "dateformat";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var src = {
  git: simpleGit(__dirname + "/../binaryen"),
  filter: tag => {
    var match = /^version_(\d+)$/.exec(tag); // see: https://github.com/WebAssembly/binaryen/issues/1156
    return match ? {
      tag,
      version: match[1] + ".0.0",
    } : null;
  }
};

var dst = {
  git: simpleGit(__dirname + "/.."),
  filter: tag => {
    var match = /^v(\d+\.\d+\.\d+)(?:\-|$)/.exec(tag);
    return match ? {
      tag,
      version: match[1]
    } : null;
  }
};

async function latest(repo) {
  try {
    const tags = await repo.git.tags({ "--sort": "-committerdate" });
    for (let i = 0; i < tags.all.length; i++) {
      const tag = tags.all[i];
      const res = repo.filter(tag);
      if (res !== null) {
        return res;
      }
    }
    return { version: null, tag: null };
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
}

async function main() {
  if (process.argv[2] === "tag") {
    const { tag } = await latest(src);
    console.log(tag);
    return;
  }

  let { version: srcVer } = await latest(src);
  let { version: dstVer } = await latest(dst);

  srcVer = semver.clean(srcVer);
  dstVer = semver.coerce(dstVer);

  if (!dstVer || semver.gt(srcVer, dstVer)) {
    console.log(srcVer);
  } else {
    console.log(`${srcVer}-nightly.${dateFormat(Date.UTC(), "yyyymmdd")}`);
  }
}

main();
