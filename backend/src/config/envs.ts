import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  MAILER_SECRET_KEY: string;
  MAILER_EMAIL: string;
  MAILER_SERVICE: string;
  FRONTEND_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_CLIENT_SECRET: joi.string().required(),
    GOOGLE_CALLBACK_URL: joi.string().required(),
    MAILER_SECRET_KEY: joi.string().required(),
    MAILER_EMAIL: joi.string().email().required(),
    MAILER_SERVICE: joi.string().required(),
    FRONTEND_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env) as {
  error?: joi.ValidationError;
  value: EnvVars;
};

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  googleClientId: envVars.GOOGLE_CLIENT_ID,
  googleClientSecret: envVars.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: envVars.GOOGLE_CALLBACK_URL,
  mailerSecretKey: envVars.MAILER_SECRET_KEY,
  mailerEmail: envVars.MAILER_EMAIL,
  mailerService: envVars.MAILER_SERVICE,
  frontendUrl: envVars.FRONTEND_URL,
};
