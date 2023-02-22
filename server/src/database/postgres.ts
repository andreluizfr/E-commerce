import { DataSource } from "typeorm";
import { Product } from "../entities/Product";
import { Rating } from "../entities/Rating";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "admin",
    database: process.env.POSTGRES_DB || "lojadev",
    synchronize: Boolean(process.env.POSTGRES_DB), //if It's true anytime you make changes to your entity, it’ll automatically update the schemas changes with the database linked to your app
    logging: true,
    entities: [User, Product, Rating],
    migrations: ['src/database/migrations/**/*.ts'],
    subscribers: ["src/subscriber/**/*.ts"]
});