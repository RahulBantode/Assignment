const { DataTypes } = require('sequelize');
const sequelize = require('./dbConfigurations');

const tblProducts = sequelize.define(
    'tbl_products',
    {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        created_at:{
            type: DataTypes.DATE,
            defaultValue: Date.now(),
        },
        updated_at:{
            type: DataTypes.DATE,
        }
    },
)

module.exports = tblProducts;