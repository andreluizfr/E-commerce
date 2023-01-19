import { config as configDotenv } from 'dotenv';
import { resolve } from 'path';

console.log("Environment is "+process.env.NODE_ENV+"...");
switch (process.env.NODE_ENV) {
    case "development":
      configDotenv({
        path: resolve(__dirname, "../../env/development.env"),
      });
      break;

    case "production":
      configDotenv({
        path: resolve(__dirname, "../../env/production.env"),
      });
      break;

    default:
      throw new Error('NODE_ENV is not handled!');
}