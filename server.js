'use strict';

const express = require('express');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const PORT = process.env.PORT || 5000;
const routes = require('./routes')

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static('./vghypeman/dist'));

app.use(routes)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


