module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"review",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},			
			review: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING(100),
				allowNull: false,
				validate: {
					len: [2, 100],
				},
			},
			body: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{ underscored: true }
	);
};

