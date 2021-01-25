const router = require('express').Router();
const { userController,  sessionController } = require('../controllers');
const { validate, ensureAuthenticated } = require('../middlewares');

const {
  validationSchemas: { users }
} = require('../validations');

router.post('/login', validate(users.session), sessionController.authenticate);

router.use(ensureAuthenticated.auth);
router.post('/create', validate(users.create), userController.create);



module.exports.users = router;
