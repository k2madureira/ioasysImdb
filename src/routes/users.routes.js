const router = require('express').Router();
const { userController,  sessionController } = require('../controllers');
const { validate } = require('../middlewares');
const {
  validationSchemas: { users }
} = require('../validations');

router.post('/login', validate(users.session), sessionController.Authenticate);

router.post('/create', validate(users.create), userController.create);



module.exports.users = router;
