const joi =require('joi');

module.exports.SchoolSchema=joi.object({
    name:joi.string().required(),
    address:joi.string().required(),
    latitude:joi.number().required(),
    longitude:joi.number().required()
})
