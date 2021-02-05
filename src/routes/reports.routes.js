const router = require('express').Router();
const { reportController } = require('../controllers');
const { ensureAuthenticated, validate } = require('../middlewares');

const {
  validationSchemas: { reports },
} = require('../validations');

router.use(ensureAuthenticated.auth);
router.get('/', validate(reports.top), reportController.top);

module.exports.reports = router;
