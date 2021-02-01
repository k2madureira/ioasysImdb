const router = require('express').Router();
const { genreController } = require('../controllers');
const {
  ensureAuthenticated,
  ensureAdmin,
  validate,
} = require('../middlewares');

const {
  validationSchemas: { genres },
} = require('../validations');

router.use(ensureAuthenticated.auth, ensureAdmin.admin);
router.post('/', validate(genres.create), genreController.create);
router.put('/:id', validate(genres.update), genreController.update);
router.patch('/:id', validate(genres.update), genreController.update);

module.exports.genres = router;
