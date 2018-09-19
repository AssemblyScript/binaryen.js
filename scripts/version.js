var simpleGit  = require("simple-git");
var semver     = require("semver");
var dateFormat = require('dateformat');

var src = {
  git: simpleGit(__dirname + "/../binaryen"),
  filter: tag => {
    var match = /^version_(\d+)$/.exec(tag); // see: https://github.com/WebAssembly/binaryen/issues/1156
    return match ? {
      tag: tag,
      version: match[1] + ".0.0",
    } : null;
  }
};

var dst = {
  git: simpleGit(__dirname + "/.."),
  filter: tag => {
    var match = /^v(\d+\.\d+\.\d+)$/.exec(tag);
    return match ? {
      tag: tag,
      version: match[1]
    } : null;
  }
};

function latest(repo) {
  return new Promise((resolve, reject) => {
    repo.git.tags({ "--sort": "-committerdate" }, (err, tags) => {
      if (err) return reject(err);
      for (var i = 0; i < tags.all.length; ++i) {
        var result = repo.filter(tags.all[i]);
        if (result !== null) {
          repo.tag = result.tag;
          repo.version = result.version;
          return resolve();
        };
      }
      return reject(Error("no matching tags: " + tags.all.join(", ")));
    });
  }).catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
}

if (process.argv[2] === "tag") {
  latest(src).then(() => console.log(src.tag));
} else {
  latest(src).then(() => {
    latest(dst).then(() => {
      if (semver.gt(src.version, dst.version))
        console.log(src.version);
      else
        console.log(src.version + "-nightly." + dateFormat(Date.UTC(), "yyyymmdd"));
    });
  });
}
