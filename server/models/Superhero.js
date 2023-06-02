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
        allowNull: false
    },
    real_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin_description: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    catch_phrase: {
        type: DataTypes.STRING
    }
});

const Superpower = sequelize.define('superpower', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

});
const SuperheroImage = sequelize.define('superhero_image', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

Superhero.hasMany(Superpower, {as: 'skills'});
Superpower.belongsTo(Superhero);

Superhero.hasMany(SuperheroImage, {as: 'images'});
SuperheroImage.belongsTo(Superhero);


module.exports = {Superhero, SuperheroImage, Superpower};