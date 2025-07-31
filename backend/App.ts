import express, {Request, Response} from 'express'
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo'


const app = express();

//MongoDB setup
const dbUrl = 'mongodb://localhost:27017/test';
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('Mongo connection succesful!');
  })
  .catch((err) => {
    console.log('Mongo error!');
    console.log(err);
  });

  //Session setup
app.use(session({
secret: 'c134cY87K43o',
store: MongoStore.create({ 
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
crypto: {
    secret: 'c134cY87K43o',
  }
})
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(3000)