var express = require("express");
var router = express.Router();
const fs = require("fs");
const e = require("express");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

countSpace = (line) => {
  var newLine = "";
  for (var i = 0; i < line.length; i++) {
    if (line.charAt(i) == " ") {
      newLine = newLine + " ";
    } else {
      break;
    }
  }
  return newLine;
};

jenkins = (req, res) => {
  var origin = "./operator-configure/armory-jenkins-template.yml";
  var target = "./operator-configure/kustomize/patch-jenkins.yml";
  var allLines = fs.readFileSync(origin).toString().split("\n");
  console.log("read all the lines from the origin");
  fs.writeFileSync(target, "", function () {
    console.log("file is empty");
  });

  var count = 0;
  allLines.forEach(function (line) {
    count = count + 1;
    if (line.includes("name") && count == 12) {
      newLine = countSpace(line) + "name: " + req.body.name;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("address")) {
      newLine = countSpace(line) + "address: https://" + req.body.hostname;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("username")) {
      newLine = countSpace(line) + "username: " + req.body.username;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("password")) {
      newLine = countSpace(line) + "password: " + req.body.password;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else {
      fs.appendFileSync(target, line.toString() + "\n");
    }
  });
};

router.post("/enable", function (req, res, next) {
  if (req.body.which === "Jenkins") {
    jenkins(req, res);
  }

  res.send("success!");
});

module.exports = router;
