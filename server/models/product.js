module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 

      title: {
        type: DataTypes.STRING(100),
        allowNull: false, 
        validate: {
            len: [2, 100]
        }
      },

      description: {
        type: DataTypes.STRING(200),
      }, 

      price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },

      imageURL: {
        type: DataTypes.STRING(255),
      },
    },

    {underscored: true}
  );
};