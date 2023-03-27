import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import { Product } from "../entities/Product.entity";
import { Collection } from "../entities/Collection.entity";
import { Payment } from "../entities/Payment.entity";
import { Order } from "../entities/Order.entity";
import { Rating } from "../entities/Rating.entity";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "lojadev.ctnoicqgrfud.sa-east-1.rds.amazonaws.com",
    port: 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "lojadev123",
    database: process.env.POSTGRES_DB || "lojadev",
    synchronize: Boolean(process.env.POSTGRES_DB), //if It's true anytime you make changes to your entity, it’ll automatically update the schemas changes with the database linked to your app
    logging: true,
    entities: [User, Product, Collection, Payment, Order, Rating],
    migrations: ['src/database/migrations/**/*.ts'],
    subscribers: ["src/subscriber/**/*.ts"]
});