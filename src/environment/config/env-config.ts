import { config } from 'dotenv';

config();

const env = process.env;
console.log(env);
export const environments = {
  port: Number(env.PORT || 3000),
  mongoUri: env.MONGO_URI,
  frontEndUrl: env.FRONTEND_URL,
  accessTokenSecret: env.ACCESS_TOKEN_SECRET,
  accessTokenExpiration: env.ACCESS_TOKEN_EXPIRATION,
  refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiration: env.REFRESH_TOKEN_EXPIRATION,
};
