const Joi = require("joi");

const authSchemaUser = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

const authSchemaElem = Joi.object({
  data: Joi.string().required(),
});

const authSchemaVElem = Joi.object({
  v: Joi.number().required(),
  elem: Joi.array().items(authSchemaElem),
});

const authSchemaRepository = Joi.object({
  title: Joi.string().required(),
  descriptionRepo: Joi.string().min(7).required(),
  colabs: Joi.array().items(authSchemaUser),
  collectionRepo: Joi.array().items(authSchemaVElem),
});

module.exports = {
  authSchemaUser,
  authSchemaRepository,
  authSchemaVElem,
  authSchemaElem,
};
