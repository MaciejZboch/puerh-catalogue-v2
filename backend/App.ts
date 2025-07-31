import express, {Request, Response} from 'express'
import mongoose from 'mongoose';
const app = express();

//MongoDB setup
const dbUrl = 'mongodb://localhost:27017/test';
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Mongo connection succesful!");
  })
  .catch((err) => {
    console.log("Mongo error!");
    console.log(err);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(3000)