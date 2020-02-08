const express = require('express');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const PORT = process.env.PORT || 5000;
const routes = require('./routes');
require('dotenv').config();

const app = express();

// Requiring our models for syncing
var db = require("./models");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static('./vghypeman/dist'));

app.use(routes);

db.sequelize.sync().then(function() {
app.listen(PORT, () => console.log(`Listening on port: ${PORT} ::  :: http://localhost:${PORT} :: http://localhost:${PORT}/api/user/1`));
});


