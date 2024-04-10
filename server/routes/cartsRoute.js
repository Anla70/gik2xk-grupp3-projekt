const router = require("express").Router();
const db = require("../models");

// för att visa alla carts
router.get("/", (req, res) => {
	db.cart.findAll().then((result) => {
		res.send(result);
	});
});

// För att kunna skapa en cart
router.post("/", (req, res) => {
	const cart = req.body;
	db.cart.create(cart).then((result) => {
		res.send(result);
	});
});
// för att kunna radera en cart
router.delete("/", (req, res) => {
	db.cart
		.destroy({
			where: { id: req.body.id },
		})
		.then(() => {
			res.json(`Varukorgen togs bort`);
		});
});

// För att få en specifik cart och visa det som finns i den
// via cartItems som innehåller produkterna´genom att includera db.products
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

// För att lägga till varor i cart, userId är för tillfället fast vid 1
router.post("/addProduct", async (req, res) => {
	const { productId, amount } = req.body;
	const userId = 1;

	try {
		// Hämtar produktinformationen baserat på productId
		const product = await db.product.findByPk(productId);
		if (!product) {
			return res.status(404).json({ message: "Produkten hittades inte" });
		}

		// Hittar en befintlig varukorg eller skapa en ny
		let cart = await db.cart.findOne({ where: { userId} });
		if (!cart) {
			cart = await db.cart.create({ userId});
		}

		// Skapar en ny cartItem med produktinformationen och lagrar den via cartRow
		const cartItem = await db.cartRow.create({
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

module.exports = router;
