const express = require('express');
const baseRoutes = require('./base.route');
const authRoutes = require('./auth.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
    {
      path: '/auth',
      route: authRoutes,
    },
    {
      path: '/users',
      route: baseRoutes,
    },
  ];
  
  defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

// const defaultRoutes = [

// ];

// defaultRoutes.forEach((route) => {
//   router.use(route.path, route.route);
// });

module.exports = router;