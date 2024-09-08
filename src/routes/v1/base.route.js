const express = require('express');
// const validate = require('../../middlewares/validate');
// const authValidation = require('../../validations/auth.validation');
const mainController = require('../../controllers/main.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

/**
 * router.get('/path', middlewares, controller.method);
 */
router.post('/create', mainController.createUser);
router.get('/:id', mainController.getUserById);

module.exports = router;