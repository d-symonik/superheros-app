const ApiError = require("../error/ApiError");
const {Superhero, Superpower, SuperheroImage} = require("../models/Superhero");
const uuid = require('uuid');
const path = require('path');
const {object, string, array} = require('yup');

module.exports = {
    create: async (req, res, next) => {
        try {
            let {
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase
            } = req.body;
            if (!req.files.image) {
                return next(ApiError.badRequestError('Add an image'));
            }
            if (!superpowers) {
                return next(ApiError.badRequestError('Add an superpower'));
            }
            const {image} = req.files;

            const heroSchema = object({
                nickname: string().min(2).max(50).required(),
                real_name: string().min(2).max(50).required(),
                origin_description: string().required(),
                superpowers: array().required(),
            });
            superpowers = JSON.parse(superpowers);
            await heroSchema.validate({nickname, real_name, origin_description, superpowers});


            const superhero = await Superhero.create({
                nickname,
                real_name,
                origin_description,
                catch_phrase,
            });
            superpowers.forEach(superpower => {
                Superpower.create({
                    name: superpower.name,
                    superheroId: superhero.id
                })
            })
            let fileName = uuid.v4() + '.jpg';
            const data = await image.mv(path.resolve(__dirname, '..', 'static', fileName));

            await SuperheroImage.create({
                image: fileName,
                superheroId: superhero.id
            })


            return res.json(superhero)
        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },
    getAll: async (req, res, next) => {
        try {
            let {page, limit} = req.query;

            page = page || 1;
            limit = limit || 5;

            let offset = page * limit - limit;

            let heroes = await Superhero.findAll({
                limit,
                offset,
                include: [{model: Superpower, as: 'skills'}, {model: SuperheroImage, as: 'images'}],

            });
            const count = await Superhero.count();

            return res.json({count, heroes});

        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },
    getById: async (req, res, next) => {
        try {
            const {id} = req.params;

            const hero = await Superhero.findOne({
                where: {id},
                include: [
                    {
                        model: Superpower,
                        as: 'skills'
                    },
                    {
                        model: SuperheroImage,
                        as: 'images'
                    }],

            });
            if (!hero) {
                return next(ApiError.badRequestError('Not found with this id'));
            }

            return res.json(hero);
        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },
    remove: async (req, res, next) => {
        try {
            const {id} = req.params;
            const candidate = await Superhero.findByPk(id);
            if (!candidate) {
                return next(ApiError.badRequestError('Not found with this id'));
            }
            await Superhero.destroy({
                where: {id}
            });
            return res.json({message: `Superhero successfully delete`});
        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },
    update: async (req, res, next) => {
        try {
            const {id} = req.params;
            console.log(req.body)
            await Superhero.update({...req.body}, {where: {id}});

            const updatedHeroInfo = await Superhero.findByPk(id);
            return res.json(updatedHeroInfo);
        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },

}