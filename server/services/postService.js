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
				{
					model: db.review,
				},
			],
		});
		/* Om allt blev bra, returnera post */
		return createResponseSuccess(_formatProduct(product));
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}



async function addReview (id, review) {
	if (!id) {
		return createResponseError(422, "Id är obligatoriskt");
	}
	try {
		review.productId = id;
		const newReview = await db.review.create(review);
		return createResponseSuccess(newReview );
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}



// async function addToCart (id, cart) {
// 	if (!id) {
// 		return createResponseError(422, "Id är obligatoriskt");
// 	}
// 	try {
// 		cart.userId = id;
// 		const newCart= await db.cart.create(cart);
// 		return createResponseSuccess(newCart );
// 	} catch (error) {
// 		return createResponseError(error.status, error.message);
// 	}
// }






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
		body: product.body,
		imageUrl: product.imageUrl,
		price: product.price,
		createdAt: product.createdAt,
		updatedAt: product.updatedAt,

		// author: {

		// 	    // id: post.user.id,
		// 	// id: product.user.id,
		// 	// email: product.user.email,
		// 	// firstName: review.user.firstName,
		// 	// lastName: product.user.lastName,
		// },

		carts: [],
		reviews: [],
	};

	if (product.reviews) {
		cleanProduct.reviews = [];

		product.reviews.map((review) => {
			return (cleanProduct.reviews = [
				{
					//id: user.id,
					// review (title).review.review (title)
					review: review.review,
					title: review.title,
					 body: review.body,
					// author: user.id,

					//  author: comment.user.username,
					createdAt: review.createdAt,
				},
				...cleanProduct.reviews,
			]);
		});
	}
	// 	if (product.reviews) {
	//     cleanProduct.reviews = product.reviews.map((review) => ({
	// 			review:review.review,
	//         // title: review.title,
	//         // body: review.body,
	//         // author: review.user ? review.user.email: 'Anonym',
	//         createdAt: review.createdAt,
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
	//_addProductToCart,
	getByCart,
	getByUser,
	addReview,
	getById,
	getAll,
	create,
	update,
	destroy,
};
