const { DataTypes } = require('sequelize');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');
const sequelize = require('../sequelize');

const Token = sequelize.define(
    'Token',
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false, // equivalent to `required: true`
        unique: true,     // equivalent to `index: true` in Mongoose
      },
      user: {
        type: DataTypes.INTEGER,  // Assuming `User` ID is an integer
        references: {
          model: 'Users',         // Refers to the Users table (adjust according to your actual setup)
          key: 'id',
        },
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true, // Sequelize automatically adds createdAt and updatedAt timestamps
    }
  );
  
  // Adding a custom method to JSON conversion
  Token.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    // Optionally strip or transform any fields here
    return values;
  };
  
  module.exports = Token;