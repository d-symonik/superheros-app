const sequelize = require('../db');

const {DataTypes} = require('sequelize');
const Superhero = sequelize.define('superhero', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull:false
    },
    real_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    origin_description: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    superpowers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false
    },
    catch_phrase: {
        type: DataTypes.STRING
    },
    images:{
        type:DataTypes.ARRAY(DataTypes.STRING)
    }
});
module.exports = {Superhero};