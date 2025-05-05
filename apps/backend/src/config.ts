import Joi from 'joi';
import { DeepRequired } from 'utility-types';

const config = () => {
  const values = {
    showPlayground:
      process.env.NODE_ENV !== 'production' ||
      !!process.env.SHOW_ADMIN_PLAYGROUND,
    autoSchemaFile:
      process.env.AUTO_SCHEMA_FILE === 'true' ? true : 'schema.gql',
    generateSchemaFiles: process.env.GENERATE_SCHEMA_FILES === 'true',
  };

  const schema = Joi.object({
    showPlayground: Joi.boolean().required(),
    autoSchemaFile: [Joi.string().required(), Joi.boolean().required()],
    generateSchemaFiles: Joi.boolean().required(),
  });

  const { error } = schema.validate(values, { allowUnknown: false });

  if (error) {
    throw new Error(`Config validation error in app module: ${error.message}`);
  }

  return {
    app: values,
  };
};

export type AppConfig = DeepRequired<ReturnType<typeof config>>;

export default config;
