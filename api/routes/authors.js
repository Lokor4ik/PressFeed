const router = require('express').Router();
const authors = require('../controllers/authors-controller');

router.post('/allMonths', authors.defineALlMonths);
router.post('/authors', authors.findAll);

module.exports = router;
