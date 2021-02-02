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
router.patch('/:id', validate(genres.update), genreController.update);
router.delete('/:id', validate(genres.del), genreController.delete);

module.exports.genres = router;
