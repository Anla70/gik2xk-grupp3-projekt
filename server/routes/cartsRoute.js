const router = require("express").Router();
const db = require("../models");
// const postService = require("../services/postService");


// **** Vi har ändrat till id/product istället för cart/addProduct
// router.get("/:id/products", (req, res) => {
// 	const id = req.params.id;

// 	postService.getByCart(id).then((result) => {
// 		res.status(result.status).json(result.data);
// 	});
// });

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
			res.json(`Varukorgen togs bort`);
		});
});



// router.post("/:id/addToCart/", (req, res) => {
// 	const cart = req.body;
// 	db.cart._findOrCreateCartId(cart).then((result) => {
// 		res.send(result);
// 	});
// });

// router.post("/:id/addToCart/", (req, res) => {
// 	const cart = req.body;
// 	db.cart._addProductToCart(cart).then((result) => {
// 		res.send(result);
// 	});
// });
router.get("/:id", async (req, res) => {
	try {
		const cartItems = await db.cart.findAll({
			where: {},
			include: [
				{
					model: db.product,
					as: "products",
				},
			],
		});
		res.json(cartItems);
	} catch (error) {
		console.error("Error fetching cart items:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});





router.post("/addProduct", async (req, res) => {
	const { productId, amount } = req.body;
	const userId = 1;

	try {
		// Hämta produktinformationen baserat på productId
		const product = await db.product.findByPk(productId);
		if (!product) {
			return res.status(404).json({ message: "Produkten hittades inte" });
		}

		// Hitta en befintlig varukorg eller skapa en ny
		let cart = await db.cart.findOne({ where: { userId} });
		if (!cart) {
			cart = await db.cart.create({ userId});
		}

		// Skapa en ny cartItem med produktinformationen
		const cartItem = await db.cartRow.create({
			// userId:1 ,
			cartId: cart.id,
			productId: product.id,
			amount: amount,
			include: [
				{
					model: db.product,
					as: "products", 
				},
			],
		});
		res.status(201).json({
			message: "Produkten har lagts till i varukorgen",
			cartItem: cartItem, 
		});
	} catch (error) {
		console.error("Produkten ligger redan i varukorgen:", error);
		res.status(500).json({
			message: "Internt serverfel vid tillägg av produkt till varukorgen",
		});
	}
});

router.get("/addProduct", (req, res) => {
	db.cart.findAll().then((result) => {
		res.send(result);
	});
});

module.exports = router;
