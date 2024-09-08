const express = require('express');
// const validate = require('../../middlewares/validate');
// const authValidation = require('../../validations/auth.validation');
const mainController = require('../../controllers/main.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', mainController.index);
router.get('/users', mainController.getUsers);
router.get('/users/create', mainController.createUser);
router.get('/users/:id', auth(), mainController.getUserById);

module.exports = router;