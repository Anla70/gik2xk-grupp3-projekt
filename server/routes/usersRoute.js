const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");
const postService = require("../services/postService");

const constraints = {
	email: {
		length: {
			minimum: 4,
			maximum: 200,
			tooShort: "^E-postadressen måste vara minst %{count} tecken lång.",
			tooLong: "^E-postadressen får inte vara längre än %{count} tecken lång.",
		},
		email: {
			message: "^E-postadressen är i ett felaktigt format.",
		},
	},
	imageUrl: {
		url: {
			message: "^Sökvägen är felaktig.",
		},
	},
};

router.get("/:id/getCart/", (req, res) => {
	const id = req.params.id;
	postService.getByUser(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.get("/:id/", (req, res) => {
	const id = req.params.id;
	postService.getById(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.get("/:id/getProduct/", (req, res) => {
	const id = req.params.id;
	postService.getByUser(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.get("/", (req, res) => {
	db.user.findAll().then((result) => {
		res.send(result);
	});
});

router.post('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.user.create(user).then((result) => {
      res.send(result);
    });
  }
});

router.post("/:id/product/", (req, res) => {
	const user = req.body;
	const invalidData = validate(user, constraints);
	if (invalidData) {
		res.status(400).json(invalidData);
	} else {
		db.user.create(user).then((result) => {
			res.send(result);
		});
	}
});

router.put("/", (req, res) => {
	const user = req.body;
	const invalidData = validate(user, constraints);
	const id = user.id;
	if (invalidData || !id) {
		res.status(400).json(invalidData || "Id är obligatoriskt.");
	} else {
		db.user
			.update(user, {
				where: { id: user.id },
			})
			.then((result) => {
				res.send("Användaren har uppdaterats.");
			});
	}
});

router.delete("/", (req, res) => {
	db.user
		.destroy({
			where: { id: req.body.id },
		})
		.then(() => {
			res.json(`Användaren raderades`);
		});
});

module.exports = router;
