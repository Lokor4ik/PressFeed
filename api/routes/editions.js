const router = require('express').Router();
const editions = require('../controllers/editions-controller');

router.get('/editions', editions.findAll);

module.exports = router;
