const blogController = require('../controllers/blog');
const router = require('express').Router();
const verify = require('../middleware/verify')

// GET /comments
router.get('/', blogController.getArticles);

router.use(verify); // routes below require authentication this middleware checks for that

// POST /blogs
router.post('/', blogController.createArticle);

// PATCH /blogs/:id
router.patch('/:id', blogController.updateArticle);

// DELETE /blogs/:id
router.delete('/:id', blogController.deleteArticle);

module.exports = router;