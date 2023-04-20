import './configs/getEnv.config';
import "reflect-metadata";
import app from './app';
import { AppDataSource } from './database/data-source';


//    ****  connecting with database  ****    //
AppDataSource.initialize().then(() => {
    console.log("Connection with DB stablished...\n");
}).catch((error) => console.log(error));


//    ****  starting server  ****    //
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.debug(`Server listening on ${port}...\n`);
});