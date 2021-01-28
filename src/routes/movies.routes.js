const router = require('express').Router();
const { movieController } = require('../controllers');
const {
  ensureAdmin,
  ensureAuthenticated,
  validate,
} = require('../middlewares');

const {
  validationSchemas: { movies },
} = require('../validations');

router.use(ensureAuthenticated.auth, ensureAdmin.admin);
router.post('/', validate(movies.create), movieController.create);
router.put('/:id', validate(movies.update), movieController.update);

module.exports.movies = router;
