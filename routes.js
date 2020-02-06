'use strict';

// Requiring our models
var db = require("./models");

const express = require('express');
const router = express.Router();

router.get("/api/user/:id", function (req, res) {
  db.user.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (dbUser) {
    res.json(dbUser);
  });
});

router.post("/api/create/profile", function (req, res) {
  db.user.create(req.body).then(function (dbUser) {
    res.json(dbUser);
  });
});

// PUT route for updating posts
router.put("/api/update/:id/:type", function (req, res) {

  switch (req.params.type) {
    case "email":
      db.user.update(
        req.body, {
          where: {
            id: req.params.id
          }
        }).then(function (dbUser) {
        res.json(dbUser);
      });
      break;
    case "username":
      db.user.update(
        req.body, {
          where: {
            id: req.params.id
          }
        }).then(function (dbUser) {
        res.json(dbUser);
      });
      break;
    case "password":
      db.user.update(
        req.body, {
          where: {
            id: req.params.id
          }
        }).then(function (dbUser) {
        res.json(dbUser);
      });
      break;
    case "picture":
      db.user.update(
        req.body, {
          where: {
            id: req.params.id
          }
        }).then(function (dbUser) {
        res.json(dbUser);
      });
      break;
    case "email":
      db.user.update(
        req.body, {
          where: {
            id: req.params.id
          }
        }).then(function (dbUser) {
        res.json(dbUser);
      });
      break;
    case "email":
      db.user.update(
        req.body, {
          where: {
            id: req.params.id
          }
        }).then(function (dbUser) {
        res.json(dbUser);
      });
      break;



  }
});

module.exports = router;