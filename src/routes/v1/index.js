const express = require('express');
const baseRoutes = require('./base.route');
const config = require('../../config/config');

const router = express.Router();

router.use(baseRoutes);

// const defaultRoutes = [

// ];

// defaultRoutes.forEach((route) => {
//   router.use(route.path, route.route);
// });

module.exports = router;