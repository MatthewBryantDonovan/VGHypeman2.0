'use strict';
/////////////////  Dependencies /////////////////
const axios = require("axios");
// Requiring our models
var db = require("./models");

const express = require('express');
const router = express.Router();

const cors = require('cors');
router.use(cors());

// POST route for Log in User
router.post("/api/user/login", function (req, res) {

  db.user.findOne({
    where: req.body}).then(function (dbUser) {

      if (dbUser == null) {
        res.json({
          error: "Login failed"
        });
      } else {
        dbUser.dataValues.password = "NO PASSWORD HERE";

        let x_query_getOauth = "https://id.twitch.tv/oauth2/token?client_id="+process.env.TWITCH_API_KEY+"&client_secret="+process.env.TWITCH_SECRET+"&grant_type=client_credentials";
        axios.post((x_query_getOauth))
        .then(function (response) {

            dbUser.twitchToken = response.data.access_token;
            console.log(response.data.access_token + " = token ACTUAL");
            console.log(dbUser.twitchToken + " = db token");
            
            res.json(dbUser);
        }).catch( function (err){
            res.status(422).json(err)
            res.json(dbUser);
        });
        
      }
  });
});

// POST route for Create Profile
router.post("/api/create/profile", function (req, res) {
  db.user.create(req.body).then(function (dbUser) {
    if (dbUser == null) {
      res.json({
        error: "Registration failed"
      });
    } else {
      res.json(dbUser);
    }
  });
});

// PUT route for updating profile content
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
    case "favorite":
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