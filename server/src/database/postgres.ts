import { DataSource } from "typeorm";
import { Product } from "../entities/Product";
import { Rating } from "../entities/Rating";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "loja-database-dev.ctnoicqgrfud.sa-east-1.rds.amazonaws.com",
    port: 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "loja1234",
    database: process.env.POSTGRES_DB || "lojadbdev",
    synchronize: true,
    logging: true,
    entities: [User, Product, Rating],
    subscribers: [],
    migrations: ['src/database/migrations'],
});