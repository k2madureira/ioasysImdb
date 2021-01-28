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

router.get('/detail/:tt', ensureAuthenticated.auth, movieController.detail);
router.get('/list', ensureAuthenticated.auth, movieController.list);

router.use(ensureAuthenticated.auth, ensureAdmin.admin);
router.post('/', validate(movies.create), movieController.create);
router.put('/:id', validate(movies.update), movieController.update);
router.patch('/:id', validate(movies.update), movieController.update);
router.delete('/:id', validate(movies.del), movieController.delete);

module.exports.movies = router;
