import './configs/env.config';

import express from 'express';
import "reflect-metadata";

import cookieParser from 'cookie-parser';
import cors from 'cors';
const corsOptions = {
	origin: process.env.BASE_URL_WEB_APP,
	credentials: true 
};

import fs from 'fs';
import path from 'path';
import morganBody from 'morgan-body';

import { AppDataSource } from './database/data-source';

import { userRouter } from './routes/User.routes';
import { productRouter } from './routes/Product.routes';




//    ****  creating express app  ****    /
const app = express();




//    ****  middlewares  ****    //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));




//    ****  loggers  ****    //
//creating /log dir
const logsDir = path.join(__dirname, "../logs");
try{
	fs.mkdirSync(logsDir);
	console.log('Pasta de logs criada...');
} catch (err) {
	console.log('Pasta de logs já existe...');
}

//creating express.log stream file
const log = fs.createWriteStream(
	path.join(logsDir, "express.log"), { flags: "a" }
);
console.log('Arquivo de logs definido...');

//logs to write a stream
morganBody(app, {
	logReqUserAgent: false,
	logRequestBody: true,
	stream: log,
	noColors: true
});

//logs on console
if(process.env.NODE_ENV === "development")
	morganBody(app, {
		logReqUserAgent: false,
		logRequestBody: true,
		logIP: false
	});




//    ****  routes  ****    //
app.use('/user', userRouter);
app.use('/product', productRouter);



//    ****  connecting with database  ****    //
AppDataSource.initialize().then(() => {
    console.log("Connection with DB stablished...\n");
}).catch((error) => console.log(error));




//    ****  starting server  ****    //
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.debug(`Server listening on ${port}...\n`);
});