const router = require('express').Router();
const { userController, sessionController } = require('../controllers');
const {
  validate,
  ensureAuthenticated,
  ensureAdmin,
} = require('../middlewares');

const {
  validationSchemas: { users },
} = require('../validations');

router.post('/login', validate(users.session), sessionController.authenticate);

router.use(ensureAuthenticated.auth);

router.use(ensureAdmin.admin);
router.post('/', validate(users.create), userController.create);
router.put('/:id', validate(users.update), userController.update);

module.exports.users = router;
