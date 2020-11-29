const router = require('express').Router();
const authors = require('../controllers/authors-controller');

router.post('/api/allMonths', authors.defineALlMonths);
router.post('/api/authors', authors.findAll);

module.exports = router;
