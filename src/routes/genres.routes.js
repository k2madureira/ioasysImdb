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

module.exports.genres = router;
