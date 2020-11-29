const router = require('express').Router();
const articles = require('../controllers/articles-controller');

router.get('/api/articles', articles.findAll);

module.exports = router;
