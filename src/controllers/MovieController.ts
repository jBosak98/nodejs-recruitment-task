import express, {NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import MovieService from "../models/movies/MovieService";

const getAccessLevels = (req: Request) => req.auth.role
const generateHasAccessLvl = (lvl: string) => (req: Request) => getAccessLevels(req).includes(lvl)


const MoviesController = express.Router();

// @ts-ignore
const handleData = ({data, res}) => {
  if (data.error) {
    console.error(data);
    res.statusCode === 200
      ? res.status(400).json(data.errors)
      : res.json(data.errors);
  } else res.json(data.data);
}

MoviesController.post('/', async (req: Request, res, next) => {
  const movie = {...(req.body), owner: mongoose.Types.ObjectId(req.auth.userId)};
  const success = () => MovieService.createMovie(movie);
  const data = await success();
  handleData({data, res});
})

export default MoviesController;