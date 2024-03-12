const router = require('express').Router();
const db = require('../models');


router.get('/', (req, res) => {
  db.tag.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  const tag = req.body;
  db.tag.create(tag).then((result) => {
    res.send(result);
  });
});

router.put('/', (req, res) => {
    const post = req.body;
    const id = post.id;

    postService.update(post, id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.delete('/', (req, res) => {
  db.tag
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Inlägget raderades`);
    });
});

module.exports = router;