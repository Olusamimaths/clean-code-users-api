import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  REQRES_API_URL: Joi.string().required(),
  FILE_STORAGE_FOLDER_NAME: Joi.string().required(),
  RABBITMQ_USER: Joi.string().required(),
  RABBITMQ_PASSWORD: Joi.string().required(),
  RABBITMQ_HOST: Joi.string().required(),
  RABBITMQ_QUEUE_NAME: Joi.string().required(),
});
