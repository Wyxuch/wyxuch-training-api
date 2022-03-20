import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const port = 3000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});