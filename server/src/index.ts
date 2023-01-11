import './configs/env';
import express, {Request, Response, NextFunction} from 'express';
//import morgan from 'morgan';
import morganBody from 'morgan-body';

const app = express();




//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
morgan.token('data', function(req: Request, res: Response) {
    return res.;
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms \n :data \n'));
*/
morganBody(app, {
	logReqUserAgent: false,
	logRequestBody: true
});




//routes
app.get('/', (req: Request, res: Response)=>{
	res.status(200).json({message: "olá!"});
});




//starting server
const port = process.env.PORT;
app.listen(port, () => {
    console.debug(`Server listening on ${port}`);
});