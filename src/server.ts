import express, { Request, Response } from "express";
import morgan from 'morgan';
import cors from 'cors';

import router from './router';
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

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

app.get('/', (req: Request, res: Response, next) => {
   setTimeout(() => {
    next( new Error('oops! something went wrong'));
    }, 1000);
});

app.get('/health'   , (req: Request, res: Response) => {
    res.status(200).json({message: 'Server is healthy!'});
});

app.use('/api', protect, router);

app.post('/user', createNewUser);

app.post('/signin', signin)


app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({message: 'Unauthorized'});
    } else if (err.type === 'input') {
        res.status(400).json({message: 'Invalid input'});
    } else {
        res.status(500).json({message: 'Oops, something went wrong!'});
    }
})

export default app