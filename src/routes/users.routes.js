const router = require('express').Router();
const { userController } = require('../controllers');
const { validate } = require('../middlewares');
const {
  validationSchemas: { users }
} = require('../validations');

router.post('/create', validate(users.create) ,userController.create);


module.exports.users = router;
