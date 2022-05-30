import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { deserializeUser, errorHandler, notFoundHandler } from './middleware';
import { AuthRouter, UserRouter } from './routes/v1';

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: 'http://127.0.0.1/3000' }));
app.get('/ping', (req, res) => {
	return res.status(200).send('OK');
});
app.use(deserializeUser);
app.use('/api/v1', [AuthRouter, UserRouter]);
app.use('*', notFoundHandler);
app.use(errorHandler);

export { app };
