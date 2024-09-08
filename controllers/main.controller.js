const controller = require('./controller');
const _user = require('../models/user');

class MainController extends controller {

    /**
     * Index
     */
    static index(req, res) {
        res.send("Hello ctr");
    }

    /**
     * Create user
     */
    static async createUser(req, res) {
        try {
            const user = await _user.createUser();

            res.json(user);

        } catch (_error) {
            console.log(_error);
            res.status(500).json({ error: _error });
        }
    }

    /**
     * Get Users
     */
    static async getUsers(req, res) {
        try {
            const users = await _user.getAllUsers();
            res.json(users);
        } catch (_error) {
            console.log(_error);
            res.status(500).json({ error: _error });
        }
    }

    /**
     * Get user by id
     */
    static async getUserById(req, res) {
        try {
            const id = req.params.id;

            const user = await _user.getById(id);

            return res.json(user);
        } catch (_error) {
            console.log(_error);
            res.status(500).json({ error: _error });
        }
    }
}

module.exports = MainController;