const router = require('express').Router();
const { sessionController } = require('../controllers');
const { ensureAuthenticated, validate } = require('../middlewares');

const {
  validationSchemas: { scores },
} = require('../validations');

router.use(ensureAuthenticated.auth);
router.get('/:id', validate(scores.create), sessionController.create);

module.exports.movies = router;
