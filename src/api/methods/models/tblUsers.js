const { DataTypes } = require('sequelize');
const sequelize = require('./dbConfigurations');

const tblUsers = sequelize.define(
    'tbl_users',
    {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        mobile_no: {
            type: DataTypes.STRING(10),
            allowNull:true,
        },
        password: {
            type: DataTypes.STRING(255),
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

module.exports = tblUsers;