const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);
const knex = require('../database/dbConfig');

const sessionConfig = {
  name: 'cookie',
  secret: 'keep it secret, keep it safe',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true,
  },
  store: new KnexStore({
    knex,
    tablename: 'sessions',
    createtable: true,
    sidfieldname: 'sid',
    clearInterval: 1000 * 60 * 10,
  }),
}

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
};
