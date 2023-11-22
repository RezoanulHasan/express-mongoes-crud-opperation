import cors from 'cors';
import express, { Application, Request, Response } from 'express';
//import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, world!' });
});

export default app;
