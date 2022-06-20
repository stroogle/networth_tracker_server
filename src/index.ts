import express from 'express';
import cors from 'cors';

import staticRoute from './routes/static';
import pdfRoute from './routes/pdf';

const app: express.Application = express();

const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hi there');
});

app.use('/pdf', pdfRoute);
app.use('/pdfs', staticRoute);

app.listen(port, () => {
  console.log(`Now Listening on Port: ${port}...`);
});
