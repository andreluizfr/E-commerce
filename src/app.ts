import express from 'express';
import {Request, Response} from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';

import fs from 'fs';
import path from 'path';
import morganBody from 'morgan-body';

import { userRouter } from './routes/User.routes';
import { productRouter } from './routes/Product.routes';
import { collectionRouter } from './routes/Collection.routes';
import { paymentRouter } from './routes/Payment.routes';


//    ****  creating express app  ****    /
const app = express();


//    ****  middlewares  ****    //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
	origin: process.env.BASE_URL_WEB_APP,
	credentials: true 
};
app.use(cors(corsOptions));


//    ****  loggers  ****    //
if(process.env.NODE_ENV !== "test"){
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
        noColors: true,
        logIP: true
    });

    //logs on console
    if(process.env.NODE_ENV === "development")
        morganBody(app, {
            logReqUserAgent: false,
            logRequestBody: true,
            logIP: false
        });
}


//    ****  routes  ****    //
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/collection', collectionRouter);
app.use('/payment', paymentRouter);
app.get('/', (req: Request, res: Response) => {
    res.send('Esse servidor só recebe pedidos de ' + process.env.BASE_URL_WEB_APP);
});


export default app;
