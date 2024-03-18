"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
/* const process = require('process'); */
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})

	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

/* db.user.belongsTo(db.cart, { foreignKey: { allowNull: false } });
db.user.hasMany(db.cart, {
	allowNull: false,
	onDelete: "CASCADE",
}); */

db.cart.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.cart, {
	allowNull: false,
	onDelete: "CASCADE",
});



db.product.belongsToMany(db.cart, { through: db.cartRow });
db.cart.belongsToMany(db.product, { through: db.cartRow });

db.review.belongsTo(db.product);
db.product.hasMany(db.review, {
	allowNull: false,
	onDelete: "CASCADE",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
