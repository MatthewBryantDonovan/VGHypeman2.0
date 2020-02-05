'use strict';

const express = require('express');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const routes = require('./routes');

const app = express();

app.use(routes);


