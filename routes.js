'use strict';

const express = require('express');
const router = express.Router();
router.get("/api/info", function(req, res) {
      res.json({
            info: "better luck with those modals next time !"
      })
    });

router.post()
  

module.exports = router;