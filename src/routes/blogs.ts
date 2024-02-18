
const blogController = require('../controller/blog');

// GET /comments
router.get('/blogs', blogController.getArticles);

// POST /blogs
router.post('/blogs', blogController.createArticle);

// PATCH /blogs/:id
router.patch('/blogs/:id', blogController.updateArticle);

// PUT /blogs/:id
router.put('/blogs/:id', blogController.createArticle);

// DELETE /blogs/:id
router.delete('/blogs/:id', blogController.deleteArticle);

module.exports = router;
