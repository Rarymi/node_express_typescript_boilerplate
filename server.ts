import express from 'express';
import { controller } from 'controllers';

console.log(controller.controller());

const app = express();

app.get('/', (req, res) => {
  res.send({ hello: 'world' });
});

app.listen(5000, () => {
  console.log('⚡: Server is running at http://localhost:5000');
});
