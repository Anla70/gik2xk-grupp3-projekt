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

async function getByCartRow(id) {
	try {
		const cartRow = await db.cartRow.findOne({ where: { id: id } });
		const allCartRows = await cartRow.getPosts({
			include: [db.user, db.cartRow],
		});
		/* Om allt blev bra, returnera allPosts */
		return createResponseSuccess(allCartRows.map((post) => _formatPost(post)));
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function getByUser(userId) {
	try {
		const user = await db.user.findOne({ where: { id: userId } });
		const allPosts = await user.getPosts({ include: [db.user, db.product] });
		/* Om allt blev bra, returnera allPosts */
		return createResponseSuccess(allPosts.map((post) => _formatPost(post)));
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function getById(id) {
	try {
		const post = await db.post.findOne({
			where: { id },
			include: [
				db.user,
				db.product,
				{
					model: db.rating,
					include: [db.user],
				},
			],
		});
		/* Om allt blev bra, returnera post */
		return createResponseSuccess(_formatPost(post));
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function getAll() {
	try {
		const allPosts = await db.post.findAll({ include: [db.user, db.product] });
		/* Om allt blev bra, returnera allPosts */
		return createResponseSuccess(allPosts.map((post) => _formatPost(post)));
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function addRating(id, rating) {
	if (!id) {
		return createResponseError(422, "Id är obligatoriskt");
	}
	try {
		rating.postId = id;
		const newRating = await db.rating.create(rating);
		return createResponseSuccess(newRating);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

// *******   Ska det vara product?
async function create(post) {
	const invalidData = validate(post, constraints);
	if (invalidData) {
		return createResponseError(422, invalidData);
	}
	try {
		const newPost = await db.post.create(post);
		//post tags är en array av namn
		//lägg till eventuella taggar
		await _addTagToPost(newPost, post.tags);

		return createResponseSuccess(newPost);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function update(post, id) {
	const invalidData = validate(post, constraints);
	if (!id) {
		return createResponseError(422, "Id är obligatoriskt");
	}
	if (invalidData) {
		return createResponseError(422, invalidData);
	}
	try {
		const existingPost = await db.post.findOne({ where: { id } });
		if (!existingPost) {
			return createResponseError(404, "Hittade inget inlägg att uppdatera.");
		}
		await _addTagToPost(existingPost, post.tags);
		await db.post.update(post, {
			where: { id },
		});
		return createResponseMessage(200, "Inlägget uppdaterades.");
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}
async function destroy(id) {
	if (!id) {
		return createResponseError(422, "Id är obligatoriskt");
	}
	try {
		await db.post.destroy({
			where: { id },
		});
		return createResponseMessage(200, "Inlägget raderades.");
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

function _formatPost(post) {
	const cleanPost = {
		id: post.id,
		title: post.title,
		description: post.description,
		imageUrl: post.imageUrl,
		price: post.price,
		createdAt: post.createdAt,
		updatedAt: post.updatedAt,
		user: {
			id: post.user.id,
			email: post.user.email,
			firstName: post.user.firstName,
			lastName: post.user.lastName,
		},

		tags: [],
	};

	if (post.rating) {
		cleanPost.rating = [];

		post.ratings.map((rating) => {
			return (cleanPost.ratings = [
				{
					title: rating.title,
					body: rating.body,
					author: rating.user.username,
					createdAt: rating.createdAt,
				},
				...cleanPost.rating,
			]);
		});
	}

	if (post.cartRow) {
		post.cartRows.map((cartRow) => {
			return (cleanPost.cartRows = [cartRow.id, ...cleanPost.cartRows]);
		});
		return cleanPost;
	}
}

async function _findOrCreateTagId(name) {
	name = name.toLowerCase().trim();
	const foundOrCreatedTag = await db.tag.findOrCreate({ where: { name } });

	return foundOrCreatedTag[0].id;
}

async function _addTagToPost(post, cartRows) {
	if (cartRows) {
		cartRows.forEach(async (cartRow) => {
			const cartRowId = await _findOrCreateTagId(cartRow);
			await post.addCartRow(cartRowId);
		});
	}
}

module.exports = {
	// getByProduct,
	getByUser,
	addRating,
	// getByTag,

	getById,
	getAll,

	create,
	update,
	destroy,
};
