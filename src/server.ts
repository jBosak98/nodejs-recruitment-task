import express from "express";
import bodyParser from "body-parser";
import authMiddleware from './controllers/AuthMiddleware';
import movieController from './controllers/MovieController';
import authController from './controllers/AuthController';
import mongoose from "mongoose";
import Constants from "./lib/Config";
import cors from 'cors';
import runMigrations from "./migrations";
import internalErrorHandler from "./controllers/InternalErrorHandler";

const PORT = 3000;


const app = express();
mongoose
  .connect(Constants.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connnection successful!'))
  .then(runMigrations);

app.use(bodyParser.json());
app.use(cors());



app.use('/movies', authMiddleware, movieController);
app.use('/auth', authController);
app.use(internalErrorHandler);



app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
module.exports = app;