import express from 'express';

import staticRoute from './routes/static';
import pdfRoute from './routes/pdf';

const app: express.Application = express();

const port = 3000;

app.use(express.json());

app.use('/pdf', pdfRoute);
app.use('/pdfs', staticRoute);

app.listen(port, () => {
  console.log('Now Listening...');
});
