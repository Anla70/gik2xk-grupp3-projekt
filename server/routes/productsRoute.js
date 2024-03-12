const router = require('express').Router();
const postService = require('../services/postService');


router.post('/:id/addRating', (req, res) => {
  const rating = req.body;
  const id = req.params.id;

  postService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});



router.get('/:id', (req, res) => {
  const id = req.params.id;

  postService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/', (req, res) => {
  postService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});


router.post('/', (req, res) => {
  const product = req.body;
  postService.create(product).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/', (req, res) => {
  const post = req.body;
  const id = post.id;

  postService.update(product, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.delete('/', (req, res) => {
  const id = req.body.id;
  postService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


module.exports = router;
