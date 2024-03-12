module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"rating",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			rating: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			// created_at:{
			// 	type: DataTypes.DATETIME,
			// },
			// updated_at: {
			// 	type: DataTypes.DATETIME,
			// },
			/* product_id: {
				type: DataTypes.INTEGER,
				foreignKey: true,
				allowNull: false,
			}, */
		},

		{ underscored: true }
	);
};
