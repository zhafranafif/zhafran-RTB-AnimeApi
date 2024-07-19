const Joi = require('joi');
const Boom = require('boom');

const searchAnimeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const animeByIDValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const filterAnimeValidation = (data) => {
  const schema = Joi.object({
    genre: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).required(),
    status: Joi.array().optional()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const searchEpisodeValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};
module.exports = {
  searchAnimeValidation,
  animeByIDValidation,
  filterAnimeValidation,
  searchEpisodeValidation
};
