const router = require('express').Router();
const productService = require('../services/productService'); 


// För att lägga till en ny recension tilsammans med productService
router.post('/:id/addReview', (req, res) => {
  const review = req.body;
  const id = req.params.id;

  productService.addReview(id, review).then((result) => {
    res.status(result.status).json(result.data);
  });
});


// Visa specifik vara
router.get('/:id', (req, res) => {
  const id = req.params.id;

  productService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
// Visa alla
router.get('/', (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

// För att lägga till vara
router.post('/', (req, res) => {
  const product = req.body;
  productService.create(product).then((result) => {
    res.status(result.status).json(result.data);
  });
});


// För att ändra vara
router.put('/', (req, res) => {
  const product = req.body;
  const id = product.id;

  productService.update(product, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


// För att tabort vara
router.delete('/', (req, res) => {
  const id = req.body.id;
  productService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
