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
    if (line.charAt(i) == " " || line.charAt(i) == "-") {
      newLine = newLine + line.charAt(i);
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

  fs.writeFileSync(target, "", function () {
    console.log("file is empty");
  });

  var count = 0;

  allLines.forEach(function (line) {
    count = count + 1;
    if (line.includes("name:") && count == 12) {
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

github = (req, res) => {
  var origin = "./operator-configure/armory-github-template.yml";
  var target = "./operator-configure/kustomize/patch-github.yml";
  var allLines = fs.readFileSync(origin).toString().split("\n");

  fs.writeFileSync(target, "", function () {
    console.log("file is empty");
  });

  var count = 0;
  allLines.forEach(function (line) {
    count = count + 1;
    if (line.includes("name:") && count > 4) {
      newLine = countSpace(line) + "name: " + req.body.username;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("token:")) {
      newLine = countSpace(line) + "token: " + req.body.password;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else {
      fs.appendFileSync(target, line.toString() + "\n");
    }
  });
};

docker = (req, res) => {
  var origin = "./operator-configure/armory-docker-template.yml";
  var target = "./operator-configure/kustomize/patch-docker.yml";
  var allLines = fs.readFileSync(origin).toString().split("\n");

  fs.writeFileSync(target, "", function () {
    console.log("file is empty");
  });

  var count = 0;
  allLines.forEach(function (line) {
    count = count + 1;
    if (line.includes("name:") && count == 12) {
      newLine = countSpace(line) + "name: " + req.body.name;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("address:")) {
      newLine = countSpace(line) + "address: https://" + req.body.hostname;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("username:")) {
      newLine = countSpace(line) + "username: " + req.body.username;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("password:")) {
      newLine = countSpace(line) + "password: " + req.body.password;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("repositories:")) {
      newLine = countSpace(line) + "repositories: " + req.body.repo;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else {
      fs.appendFileSync(target, line.toString() + "\n");
    }
  });
};

kubernetes = (req, res) => {
  var origin = "./operator-configure/armory-kubernetes-template.yml";
  var target = "./operator-configure/kustomize/patch-kubernetes-acct.yml";
  var allLines = fs.readFileSync(origin).toString().split("\n");

  fs.writeFileSync(target, "", function () {
    console.log("file is empty");
  });

  var count = 0;
  allLines.forEach(function (line) {
    count = count + 1;
    if (line.includes("name:") && count == 12) {
      newLine = countSpace(line) + "name: " + req.body.name;
      fs.appendFileSync(target, newLine.toString() + "\n");
    }
    //where should the content be placed?
    else if (line.includes("token:")) {
      newLine = countSpace(line) + "token: " + req.body.content;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else {
      fs.appendFileSync(target, line.toString() + "\n");
    }
  });
};

dinghy = (req, res) => {
  var origin = "./operator-configure/armory-dinghy-template.yml";
  var target = "./operator-configure/kustomize/patch-dinghy.yml";

  var allLines = fs.readFileSync(origin).toString().split("\n");

  fs.writeFileSync(target, "", function () {
    console.log("file is empty");
  });

  var count = 0;

  allLines.forEach(function (line) {
    count = count + 1;
    //where is the dinghy name?
    if (line.includes("name:") && count == 12) {
      newLine = countSpace(line) + "name: " + req.body.name;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("templateOrg:")) {
      newLine = countSpace(line) + "templateOrg: " + req.body.org + "/";
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("templateRepo:")) {
      newLine = countSpace(line) + "templateRepo: " + req.body.repo;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else if (line.includes("githubToken:")) {
      newLine = countSpace(line) + "githubToken: " + req.body.password;
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else {
      fs.appendFileSync(target, line.toString() + "\n");
    }
  });
};

activate = (which) => {
  var target = "./operator-configure/kustomize/kustomization.yml";
  var allLines = fs.readFileSync(target).toString().split("\n");
  fs.writeFileSync(target, "", function () {
    console.log("file is empty");
  });

  var count = 0;
  allLines.forEach(function (line) {
    count = count + 1;
    if (line.includes(which)) {
      var newLine = "";
      for (var i = 0; i < line.length; i++) {
        if (line.charAt(i) != "#") {
          newLine = newLine + line.charAt(i);
        }
      }
      fs.appendFileSync(target, newLine.toString() + "\n");
    } else {
      fs.appendFileSync(target, line.toString() + "\n");
    }
  });
};

router.post("/enable", function (req, res, next) {
  if (req.body.which === "Jenkins") {
    jenkins(req, res);
    activate("jenkins");
  } else if (req.body.which === "Github") {
    activate("github");
    github(req, res);
  } else if (req.body.which === "Docker") {
    docker(req, res);
  } else if (req.body.which === "Kubernetes") {
    activate("kubernetes");
    kubernetes(req, res);
  } else if (req.body.which === "Dinghy") {
    activate("dinghy");
    dinghy(req, res);
  }

  res.send("success!");
});

module.exports = router;
