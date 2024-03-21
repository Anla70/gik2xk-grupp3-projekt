const router = require('express').Router();
const postService = require('../services/postService');
// const db = require('../models');
//  const review = require('../models/review');

router.post('/:id/addReview', (req, res) => {
  const review = req.body;
  const id = req.params.id;

  postService.addReview(id, review).then((result) => {
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

// router.get('/', (req, res) => {
//   db.product.findAll().then((result) => {
//     res.send(result);
//   });
// });


router.post('/', (req, res) => {
  const product = req.body;
  postService.create(product).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/', (req, res) => {
  const product = req.body;
  const id = product.id;

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


// Eventuellt senare
// router.get('/:id/getReview', (req, res) => {
//   const id = req.params.id;
//   postService.getById(id).then((result) => {
//     res.status(result.status).json(result.data);
//   });
// });


// router.put('/:id/addReview', (req, res) => {
//   const review = req.body;
//   const id = review.id;

//   postService.update(review, id).then((result) => {
//     res.status(result.status).json(result.data);
//   });
// });




module.exports = router;
