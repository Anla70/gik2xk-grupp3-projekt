const router = require("express").Router();
const db = require("../models");
const postService = require("../services/postService");

router.get("/cart/addProduct", (req, res) => {
	const id = req.params.id;

	postService._addProductToCart(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.post("/:id/addToCart/", (req, res) => {
	const cart = req.body;
	db.cart._findOrCreateCartId(cart).then((result) => {
		res.send(result);
	});
});

router.get("/", (req, res) => {
	db.cart.findAll().then((result) => {
		res.send(result);
	});
});

router.post("/", (req, res) => {
	const cart = req.body;
	db.cart.create(cart).then((result) => {
		res.send(result);
	});
});

router.delete("/", (req, res) => {
	db.cart
		.destroy({
			where: { id: req.body.id },
		})
		.then(() => {
			res.json(`Produkten togs bort`);
		});
});

module.exports = router;
