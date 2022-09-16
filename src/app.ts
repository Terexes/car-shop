import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import cars from './routes/cars';
import motorcycles from './routes/motorcycles';

const app = express();
app.use(express.json());
app.use('/cars', cars);
app.use('/motorcycles', motorcycles);
app.use(errorHandler);

export default app;
