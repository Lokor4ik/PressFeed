const router = require('express').Router();
const articles = require('../controllers/articles-controller');

router.get('/countArticles', articles.countAll);
router.get('/articles', articles.findAll);
router.get('/article', articles.findOne);

module.exports = router;
