/**
 * Model with Sequelize
 */
const { DataTypes, Model, Op } = require('sequelize');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const sequelize = require('../sequelize'); // Assuming you've configured Sequelize instance
const { roles } = require('../config/roles');

class User extends Model { 
    static async getById(id) {
        return await this.findOne({ where: { id } });
    }

    static async getAllUsers() {
        return await this.findAll();
    }

    static async createUser() {
        const { name, email } = {name: "test", email: "test"};
        return await this.create({ name, email });
    }

    static async isEmailTaken(email, excludeUserId) {
        const user = await User.findOne({
          where: {
            email,
            //id: excludeUserId ? { [Op.ne]: excludeUserId } : undefined,
          },
        });
        return !!user;
      }

      async isPasswordMatch(password) {
        return bcrypt.compare(password, this.password);
      }
}

User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Equivalent to `required: true`
      trim: true, // Use hooks or trimming manually if needed in Sequelize
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue('email', value.trim().toLowerCase());
      },
      validate: {
        isEmail: {
          msg: 'Invalid email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: 'Password must be at least 8 characters',
        },
        isStrongPassword(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error('Password must contain at least one letter and one number');
          }
        },
      },
      private: true, // Used by toJSON transformation (if applicable)
    },
    role: {
      type: DataTypes.ENUM,
      values: roles,
      defaultValue: 'user',
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true, // Sequelize automatically adds createdAt and updatedAt timestamps
  });

  // Hook to hash password before saving user
User.beforeSave(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  });
  
  /**
   * Custom toJSON method to remove private data
   * You can create a custom function to handle sensitive data in the response
   */
  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password; // Removing sensitive fields
    return values;
  };

module.exports = User;