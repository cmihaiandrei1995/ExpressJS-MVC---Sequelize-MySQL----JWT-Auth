/**
 * Model with Sequelize
 */
var { DataTypes, Model } = require('sequelize');
var sequelize = require('../sequelize');

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
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});

module.exports = User;

///**
// * Model with mysql alone
// */
//var db = require('../database');

//exports.getAllUsers = async () => {
//    const [rows, fields] = await db.query("SELECT * FROM `users`");
//    return rows;
//};

//exports.getById = async (id) => {
//    const [rows, fields] = await db.query(`SELECT * FROM \`users\` WHERE \`id\` = ${id}`);
//    return rows;
//}