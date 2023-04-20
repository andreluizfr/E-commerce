"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
console.log("Environment is " + process.env.NODE_ENV + "...");
switch (process.env.NODE_ENV) {
    case "development":
        (0, dotenv_1.config)({
            path: (0, path_1.resolve)(__dirname, "../../env/development.env"),
        });
        break;
    case "production":
        (0, dotenv_1.config)({
            path: (0, path_1.resolve)(__dirname, "../../env/production.env"),
        });
        break;
    case "test":
        (0, dotenv_1.config)({
            path: (0, path_1.resolve)(__dirname, "../../env/test.env"),
        });
        break;
    default:
        throw new Error('NODE_ENV is not handled!');
}
