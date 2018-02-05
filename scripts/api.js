var fs = require("fs");
var path = require("path");

var apiPath = path.join(__dirname, "..", "API.md");
var readmePath = path.join(__dirname, "..", "README.md");

var apiSource = fs.readFileSync(apiPath, "utf8");
var readmeSource = fs.readFileSync(readmePath, "utf8");

var startTag = "<!-- START API.md -->";
var endTag = "<!-- END API.md -->";
var apiStartTag = "<!-- BEGIN API -->";

var start = readmeSource.indexOf(startTag);
if (start < 0) throw Error("start tag not found");
start += startTag.length;

var end = readmeSource.indexOf(endTag, start);
if (end < 0) throw Error("end tag not found");

var apiStart = apiSource.indexOf(apiStartTag);
if (apiStart < 0) throw Error("api start tag not found");
apiStart += apiStartTag.length;

readmeSource = readmeSource.substring(0, start) + "\n" + apiSource.substring(apiStart) + "\n" + readmeSource.substring(end);

fs.writeFileSync(readmePath, readmeSource);
