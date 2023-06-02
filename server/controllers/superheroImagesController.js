const ApiError = require("../error/ApiError");
const {SuperheroImage} = require("../models/Superhero");
const uuid = require("uuid");
const path = require("path");
module.exports = {
    add: async (req, res, next) => {
        try {
            const {superheroId} = req.params;
            const {image} = req.files;

            let fileName = uuid.v4() + '.jpg';
            await image.mv(path.resolve(__dirname, '..', 'static', fileName));
            await SuperheroImage.create({
                image: fileName,
                superheroId
            })
            return res.json(`Successfully added ${fileName}`);
        } catch (e) {
            return next(ApiError.badRequestError(e.message));
        }
    },
    remove: async (req, res, next) => {
        try {
            let {id} = req.params;
            const candidate = await SuperheroImage.findByPk(id)
            if (!candidate) {
                return next(ApiError.badRequestError("Not found with this id"));
            }
            await SuperheroImage.destroy({where: {id}});
            return res.json(`Image ${id} successfully deleted`);

        } catch (e) {
            return next(ApiError.badRequestError(e.message));
        }
    }
}