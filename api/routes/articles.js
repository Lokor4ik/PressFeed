const router = require('express').Router();
const articles = require('../controllers/articles-controller');

router.get('/api/countArticle', articles.countAll);
router.get('/api/articles', articles.findAll);
router.get('/api/article', articles.findOne);

module.exports = router;
