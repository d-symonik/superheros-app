const ApiError = require("../error/ApiError");
const {Superhero} = require("../models/Superhero");
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
            const {images} = req.files;
            const heroSchema = object({
                nickname: string().min(2).max(50).required(),
                real_name: string().min(2).max(50).required(),
                origin_description: string().required(),
                superpowers: array().required(),
            });
            superpowers = JSON.parse(superpowers);
            await heroSchema.validate({nickname, real_name, origin_description, superpowers});
            let fileNames = [];
            for (const image of images) {

                let fileName = uuid.v4() + '.jpg';
                await image.mv(path.resolve(__dirname, '..', 'static', fileName));

                fileNames.push(fileName);
            }

            const superhero = await Superhero.create({
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase,
                images: fileNames
            });
            return res.json(superhero)
        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },
    getAll: async (req, res, next) => {
        try {
            let {limit, page} = req.query;

            page = page || 1;
            limit = limit || 5;

            let offset = page * limit - limit;

            let heroes = await Superhero.findAndCountAll({limit, offset});
            return res.json(heroes);

        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },
    getById: async (req, res, next) => {
        try {
            const {id} = req.params;

            const hero = await Superhero.findOne({
                where: {id}
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

            await Superhero.destroy({
                where: {id}
            });
            return res.json({message: `Superhero successfully delete`});
        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },
    // update: async (req, res, next) => {
    //     try {
    //         const {id} = req.params;
    //         const {superpowers} = req.body;
    //
    //         let images = req.files.images;
    //
    //
    //         const hero = await Superhero.findByPk(id);
    //         if (images.length > 1) {
    //             for (const image of images) {
    //
    //                 let fileName = uuid.v4() + '.jpg';
    //                 await image.mv(path.resolve(__dirname, '..', 'static', fileName));
    //                 hero.images = [fileName, ...hero.images];
    //             }
    //         } else {
    //             let fileName = uuid.v4() + '.jpg';
    //             await images.mv(path.resolve(__dirname, '..', 'static', fileName));
    //             hero.images = [fileName, ...hero.images];
    //         }
    //         if (superpowers) {
    //             hero.superpowers = [...JSON.parse(superpowers), ...hero.superpowers];
    //         }
    //         const updatedHeroInfo = await hero.update({
    //             ...req.body,
    //             superpowers: hero.superpowers,
    //             images: hero.images
    //         }, {where: {id}});
    //         return res.json(updatedHeroInfo);
    //     } catch (e) {
    //         return next(ApiError.badRequestError(e.message))
    //     }
    // },

}