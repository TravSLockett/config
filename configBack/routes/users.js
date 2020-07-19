var express = require("express");
var router = express.Router();
const fs = require("fs");
const readline = require("readline");
//write to file
/*
fs.writeFile("helloworld.txt", "Hello World!", function (err) {
  if (err) return console.log(err);
  console.log("Hello World > helloworld.txt");
});
*/
/*
const readInterface = readline.createInterface({
  input: fs.createReadStream("./helloworld.txt"),
  console: false,
});

readInterface.on("line", function (line) {
  if (line.includes("name")) {
    var newLine = line + "candy";
    fs.appendFileSync("./helloworld.txt", newLine.toString() + "\n");
    console.log(line);
  }
});
*/
/*
var allLines = fs.readFileSync("./helloworld.txt").toString().split("\n");
fs.writeFileSync("./helloworld.txt", "", function () {
  console.log("file is empty");
});
allLines.forEach(function (line) {
  if (line.includes("username")) {
    var newLine = line + " CANDY";
    fs.appendFileSync("./helloworld.txt", newLine.toString() + "\n");
  } else {
    fs.appendFileSync("./helloworld.txt", line.toString() + "\n");
  }
});

// each line would have "candy" appended
allLines = fs.readFileSync("./helloworld.txt").toString().split("\n");
*/
/*
//read to file
fs.readFile("./patch-github.yml", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
*/
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/enable", function (req, res, next) {
  if (req.body.which === "jenkins") {
    var file = "./kustomization/patch-jenkins.yml";
  }
  var allLines = fs.readFileSync(file).toString().split("\n");
  fs.writeFileSync(file, "", function () {
    console.log("file is empty");
  });
  allLines.forEach(function (line) {
    if (line.includes("address")) {
      var newLine = line + req.body.address;
      fs.appendFileSync(file, newLine.toString() + "\n");
    } else if (line.includes("username")) {
      var newLine = line + req.body.username;
      fs.appendFileSync(file, newLine.toString() + "\n");
    } else if (line.includes("password")) {
      var newLine = line + req.body.password;
      fs.appendFileSync(file, newLine.toString() + "\n");
    } else {
      fs.appendFileSync(file, line.toString() + "\n");
    }
  });
  res.send("success!");
});

module.exports = router;
