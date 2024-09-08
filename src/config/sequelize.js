const { Sequelize } = require('sequelize');
const config = require('../config/config');

// Create a Sequelize instance to connect to MySQL
const _sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
    host: config.db.host,
    dialect: 'mysql',
});

module.exports = _sequelize;