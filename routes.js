'use strict';

// Requiring our models
var db = require("./models");

const express = require('express');
const router = express.Router();
router.get("/api/user/:id", function(req, res) {
      db.user.findOne({
            where: {
              id: req.params.id
            }
          }).then(function(dbUser) {
            res.json(dbUser);
          });
    });
  

module.exports = router;