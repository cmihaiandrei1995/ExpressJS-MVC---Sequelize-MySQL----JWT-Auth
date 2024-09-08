const controller = require('./controller');
const userService = require('../services/user.service');

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
            const user = await userService.createUser();

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
            const users = await userService.getAllUsers();
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

            const user = await userService.getUserById(id);

            return res.json(user);
        } catch (_error) {
            console.log(_error);
            res.status(500).json({ error: _error });
        }
    }
}

module.exports = MainController;