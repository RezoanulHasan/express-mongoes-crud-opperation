import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRoutes from './app/module/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'sever is running' });
});

export default app;
