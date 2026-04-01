import simpleGit from "simple-git";
import semver from "semver";
import dateFormat from "dateformat";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (...args) => path.resolve(__dirname, ...args);

const MAX_TAGS_LIMIT = 64;

const createRepo = (path, regex, mapVersion) => ({
  git: simpleGit(path),
  filter: tag => {
    const match = regex.exec(tag);
    return match ? {
      tag,
      version: mapVersion(match),
    } : null;
  }
});

// see: https://github.com/WebAssembly/binaryen/issues/1156
const src = createRepo(resolve('../binaryen'), /^version_(\d+)(?:_.*)?$/, ([, maj]) => `${maj}.0.0`);
const dst = createRepo(resolve('..'), /^v(\d+\.\d+\.\d+)(?:\-|$)/, ([, ver]) => ver);

async function latest(repo) {
  try {
    const tagsRaw = await repo.git.raw(['tag', '--sort=-v:refname']);
    const allTags = tagsRaw.split('\n').filter(Boolean).slice(0, MAX_TAGS_LIMIT);

    console.log('allTags:\n', allTags);

    for (let tag of allTags) {
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

  console.log('srcVer:', srcVer);
  console.log('dstVer:', dstVer);

  if (!dstVer || semver.gt(srcVer, dstVer)) {
    console.log(srcVer);
  } else {
    console.log(`${srcVer}-nightly.${dateFormat(Date.UTC(), "yyyymmdd")}`);
  }
}

main();
