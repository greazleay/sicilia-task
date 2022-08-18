import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors'
import createHttpError from 'http-errors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { HttpException } from '@exceptions/HttpException'

// Import Configs
import initDB from '@config/database';

// Import Routes
import indexRouter from '@routes/index';

config();

// Initialize DB
initDB();

const app = express();
const whitelist = ['http://localhost:4000', 'http://localhost:3000'];
export const corsOptions: CorsOptions = {
    credentials: true,
    methods: ['GET', 'DELETE', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
    origin: (requestOrigin: string | undefined, callback) => {
        if (whitelist.indexOf(requestOrigin as string) !== -1 || !requestOrigin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(morgan('dev'));
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ limit: '16mb', extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());

app.use('/', indexRouter);

// Handle 404 errors
app.use((req: Request, res: Response, next) => {
    next(createHttpError(404, 'The requested resource was not found on this server!!!'));
});

// Error handler
app.use((error: HttpException, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode ?? 500).json(error);
})

export default app;