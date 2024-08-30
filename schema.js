const Joi = require('joi');

module.exports.UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  image: Joi.object({
    url: Joi.string().allow('', null),
    filename: Joi.string().allow('', null)
  }),
  resumePath: Joi.object({
    url: Joi.string().allow('', null),
    filename: Joi.string().allow('', null)
  }),
  password: Joi.string().required(),
});


