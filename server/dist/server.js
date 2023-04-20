"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./configs/getEnv.config");
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./database/data-source");
data_source_1.AppDataSource.initialize().then(() => {
    console.log("Connection with DB stablished...\n");
}).catch((error) => console.log(error));
const port = process.env.PORT || 5000;
app_1.default.listen(port, () => {
    console.debug(`Server listening on ${port}...\n`);
});
