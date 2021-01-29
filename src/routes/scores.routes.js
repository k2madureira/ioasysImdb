const router = require('express').Router();
const { scoreController } = require('../controllers');
const { ensureAuthenticated, validate } = require('../middlewares');

const {
  validationSchemas: { scores },
} = require('../validations');

router.use(ensureAuthenticated.auth);
router.post('/:id', validate(scores.create), scoreController.create);

module.exports.scores = router;
