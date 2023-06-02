const ApiError = require("../error/ApiError");
const {Superpower} = require("../models/Superhero");
module.exports = {
    add: async (req, res, next) => {
        try {
            const {superheroId} = req.params;
            const {name} = req.body;
            if (name && name.length < 2) {
                return next(ApiError.badRequestError('Invalid name of power'));
            }
            const superpower = await Superpower.create({
                superheroId,
                name
            })
            return res.json(superpower);
        } catch (e) {
            return next(ApiError.badRequestError(e.message));
        }
    },
    remove: async (req, res, next) => {
        try {
            let {id} = req.params;
            const candidate = await Superpower.findByPk(id)
            if(!candidate){
                return next(ApiError.badRequestError("Not found with this id"));
            }
            await Superpower.destroy({where:{id}});
            return res.json('Superpower successfully deleted');

        } catch (e) {
            return next(ApiError.badRequestError(e.message));
        }
    },
    update: async (req, res, next) => {
        try {
            let {id} = req.params;
            const superpower = await Superpower.findByPk(id);

            const updatedHeroInfo = await superpower.update({
                ...req.body,
            }, {where: {id}});
            return res.json(updatedHeroInfo);
        } catch (e) {
            return next(ApiError.badRequestError(e.message));
        }
    }
}