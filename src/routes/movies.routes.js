const router = require('express').router();
const { movieController } = require('../controllers');
const {
  ensureAdmin,
  ensureAuthenticated,
  validate,
} = require('../middlewares');

const {
  validationSchemas: { movies },
} = require('../validations');

router.use(ensureAuthenticated.auth, ensureAdmin);
router.post('/', validate(movies.create), movieController.create);

module.exports.movies = router;
