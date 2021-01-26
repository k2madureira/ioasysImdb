const router = require('express').Router();
const { userController, sessionController } = require('../controllers');
const { validate, ensureAuthenticated } = require('../middlewares');

const {
  validationSchemas: { users },
} = require('../validations');

router.post('/login', validate(users.session), sessionController.authenticate);

router.use(ensureAuthenticated.auth);
router.post('/', validate(users.create), userController.create);
router.put('/:id', validate(users.update), userController.update);
router.patch('/:id', validate(users.update), userController.update);
router.delete('/:id', validate(users.del), userController.delete);

module.exports.users = router;
