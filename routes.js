'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/api/info", function(req, res) {
      res.json({
            info: "better luck with those modals next time !"
      })
    });
  

module.exports = router;