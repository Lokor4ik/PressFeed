const router = require('express').Router();
const editions = require('../controllers/editions-controller');

router.get('/api/editions', editions.findAll);

module.exports = router;
