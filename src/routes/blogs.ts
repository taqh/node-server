const blogController = require('../controllers/blog');
const router = require('express').Router();

// GET /comments
router.get('/', blogController.getArticles);

// POST /blogs
router.post('/', blogController.createArticle);

// PATCH /blogs/:id
router.patch('/:id', blogController.updateArticle);

// DELETE /blogs/:id
router.delete('/:id', blogController.deleteArticle);

module.exports = router;