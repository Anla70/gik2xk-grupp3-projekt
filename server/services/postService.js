const db = require("../models");
const {
	createResponseSuccess,
	createResponseError,
	createResponseMessage,
} = require("../helpers/responseHelper");
const validate = require("validate.js");

const constraints = {
	title: {
		length: {
			minimum: 2,
			maximum: 100,
			tooShort: "^Produktnamnet måste vara minst %{count} tecken lång.",
			tooLong: "^Produknamnet får inte vara längre än %{count} tecken lång.",
		},
	},
};

// *******************
async function getAll() {
	try {
		const allProducts = await db.product
			.findAll // Ändrat findAll till getAll
			();
		/* Om allt blev bra, returnera allPosts */
		return createResponseSuccess(
			allProducts.map((product) => _formatProduct(product))
		);
		// return createResponseSuccess(allProducts);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function getByCart(cartId) {
	try {
		const cart = await db.cart.findOne({ where: { id: cartId } });
		const allProducts = await cart.getProducts({
			// include: [db.user, db.cart],
		});
		/* Om allt blev bra, returnera allPosts */
		return createResponseSuccess(
			allProducts.map((product) => _formatProduct(product))
		);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}
// Ska det vara product eller cart? Vad ska hämtas? /* */
async function getByUser(userId) {
	try {
		const user = await db.user.findOne({ where: { id: userId } });
		const allProducts =
			await user.getProducts(/*{ include: [db.user, db.cart] }*/);
		/* Om allt blev bra, returnera allPosts */
		return createResponseSuccess(
			allProducts.map((product) => _formatProduct(product))
		);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function getById(id) {
	try {
		const product = await db.product.findOne({
			where: { id },
			include: [
				// db.user,
				// db.rating,
				{
					model: db.rating,
					// include: [db.user],
				},
			],
		});
		/* Om allt blev bra, returnera post */
		return createResponseSuccess(_formatProduct(product));
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function addRating(id, rating) {
	if (!id) {
		return createResponseError(422, "Id är obligatoriskt");
	}
	try {
		rating.productId = id;
		const newRating = await db.rating.create(rating);
		return createResponseSuccess(newRating);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

// *******   Ska det vara product?
async function create(product) {
	const invalidData = validate(product, constraints);
	if (invalidData) {
		return createResponseError(422, invalidData);
	}
	try {
		const newProduct = await db.product.create(product);
		//post tags är en array av namn
		//lägg till eventuella taggar
		await _addProductToCart(newProduct, product.carts);

		return createResponseSuccess(newProduct);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function update(product, id) {
	const invalidData = validate(product, constraints);
	if (!id) {
		return createResponseError(422, "Id är obligatoriskt");
	}
	if (invalidData) {
		return createResponseError(422, invalidData);
	}
	try {
		const existingProduct = await db.product.findOne({ where: { id } });
		if (!existingProduct) {
			return createResponseError(404, "Hittade ingen produkt att uppdatera.");
		}
		await _addProductToCart(existingProduct, product.carts);
		await db.product.update(product, {
			where: { id },
		});
		return createResponseMessage(200, "Produkten uppdaterades.");
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}
async function destroy(id) {
	if (!id) {
		return createResponseError(422, "Id är obligatoriskt");
	}
	try {
		await db.product.destroy({
			where: { id },
		});
		return createResponseMessage(200, "Produkten raderades.");
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}
// *******************
function _formatProduct(product) {
	const cleanProduct = {
		id: product.id,
		title: product.title,
		description: product.description,
		imageUrl: product.imageUrl,
		price: product.price,
		createdAt: product.createdAt,
		updatedAt: product.updatedAt,

		// author: {

		// 	    // id: post.user.id,
		// 	// id: product.user.id,
		// 	// email: product.user.email,
		// 	// firstName: rating.user.firstName,
		// 	// lastName: product.user.lastName,
		// },

		carts: [],
		ratings: [],
	};

	if (product.ratings) {
		cleanProduct.ratings = [];

		product.ratings.map((rating) => {
			return (cleanProduct.ratings = [
				{
					//id: user.id,
					// Rating (title).rating.rating (title)
					rating: rating.rating,
					// title: rating.title,
					// body: rating.body,
					// author: user.id,

					//  author: comment.user.username,
					createdAt: rating.createdAt,
				},
				...cleanProduct.ratings,
			]);
		});
	}
	// 	if (product.ratings) {
	//     cleanProduct.ratings = product.ratings.map((rating) => ({
	// 			rating:rating.rating,
	//         // title: rating.title,
	//         // body: rating.body,
	//         // author: rating.user ? rating.user.email: 'Anonym',
	//         createdAt: rating.createdAt,
	//     }));
	// }

	if (product.carts) {
		product.carts.map((cart) => {
			return (cleanProduct.carts = [cart.id, ...cleanProduct.carts]);
		});
	}
	// **********************
	return cleanProduct;
}

async function _findOrCreateCartId(name) {
	name = name.toLowerCase().trim();
	const foundOrCreatedCart = await db.cart._findOrCreateCartId({
		where: { name },
	});

	return foundOrCreatedCart[0].id;
}

async function _addProductToCart(product, carts) {
	if (carts) {
		carts.forEach(async (cart) => {
			const cartId = await _findOrCreateCartId(cart);
			await product.addCart(cartId);
		});
	}
}

module.exports = {
	_findOrCreateCartId,
	_addProductToCart,
	getByCart,
	getByUser,
	addRating,
	getById,
	getAll,
	create,
	update,
	destroy,
};
