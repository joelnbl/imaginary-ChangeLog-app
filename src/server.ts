import express, { Request, Response } from "express";
import morgan from 'morgan';
import cors from 'cors';

import router from './router';

const app = express();

// const customLogger = (req: Request, res: Response, next: Function) => {
//     const start = Date.now();
//     res.on('finish', () => {
//         const duration = Date.now() - start;
//         console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
//     });
//     next();
// }

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(customLogger);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Hello World!'});
});

app.use('/api', router);

export default app