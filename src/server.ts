import express, { NextFunction, Request, Response } from "express";
import morgan from 'morgan';
import cors from 'cors';

import router from './router';
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

const debugMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const requestId = Math.random().toString(36).substring(7);

    // Log request details
    console.group(`🔍 Request [${requestId}] started at ${new Date().toISOString()}`);
    console.log('📍 Method:', req.method);
    console.log('🌐 URL:', req.originalUrl);
    console.log('📨 Headers:', JSON.stringify(req.headers, null, 2));
    console.log('📦 Body:', JSON.stringify(req.body, null, 2));
    console.log('🔎 Query:', JSON.stringify(req.query, null, 2));
    console.groupEnd();

    // Capture response details
    const oldSend = res.send;
    res.send = function (data) {
        res.send = oldSend;
        return oldSend.call(this, data);
    };

    // Log response details when the request finishes
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.group(`✅ Response [${requestId}] completed`);
        console.log('⏱️  Duration:', `${duration}ms`);
        console.log('📊 Status:', res.statusCode);
        console.log('📫 Headers:', JSON.stringify(res.getHeaders(), null, 2));
        console.groupEnd();

        // Visual separator for better readability
        console.log('\n' + '='.repeat(80) + '\n');
    });

    // Log errors if they occur
    res.on('error', (error) => {
        console.group(`❌ Error [${requestId}]`);
        console.error('Error:', error);
        console.groupEnd();
    });

    next();
};

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
app.use(debugMiddleware);
// app.use(customLogger);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Hello World!'});
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({message: 'Server is healthy!'});
});

app.use('/api', protect, router);

app.post('/user', createNewUser);

app.post('/signin', signin)
export default app