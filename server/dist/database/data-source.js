"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../entities/User.entity");
const Product_entity_1 = require("../entities/Product.entity");
const Collection_entity_1 = require("../entities/Collection.entity");
const Payment_entity_1 = require("../entities/Payment.entity");
const Order_entity_1 = require("../entities/Order.entity");
const Rating_entity_1 = require("../entities/Rating.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "lojadev.ctnoicqgrfud.sa-east-1.rds.amazonaws.com",
    port: 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "lojadev123",
    database: process.env.POSTGRES_DB || "lojadev",
    synchronize: Boolean(process.env.POSTGRES_DB),
    logging: process.env.NODE_ENV === "test" ? false : true,
    entities: [User_entity_1.User, Product_entity_1.Product, Collection_entity_1.Collection, Payment_entity_1.Payment, Order_entity_1.Order, Rating_entity_1.Rating],
    migrations: ['src/database/migrations/**/*.ts'],
    subscribers: ["src/subscriber/**/*.ts"]
});
