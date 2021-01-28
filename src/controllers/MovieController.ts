import express, {NextFunction, Request, Response} from 'express';
import mongoose from 'mongoose';
import MovieService from "../models/movies/MovieService";
import getOmdbLink from '../lib/getOmdbLink';
import fetch from 'node-fetch';
import {MovieType} from "../models/movies/Movie";

const getAccessLevels = (req: Request) => req.auth.role
const generateHasAccessLvl = (lvl: string) => (req: Request) => getAccessLevels(req).includes(lvl)


const MoviesController = express.Router();


const handleData = ({data, res}: { data: any, res: any }) => {
  if (data.error) {
    console.error(data);
    res.statusCode === 200
      ? res.status(400).json(data.errors)
      : res.json(data.errors);
  } else res.json(data.data);
}

MoviesController
  .post('/', async (req: Request, res, next) => {
    if (!req.body.title) {
      return handleData({data: {error: true, errors: ['Title is missing']}, res});
    }
    const requestLink = getOmdbLink(req.body.title);
    const additionalRequest = await fetch(requestLink);
    const additionalInfo = await additionalRequest.json();
    const movie: MovieType = {
      title: req.body.title,
      owner: mongoose.Types.ObjectId(req.auth.userId),
      released: Date.parse(additionalInfo.Released) ? new Date(additionalInfo.Released) : null,
      genre: additionalInfo.Genre || null,
      director: additionalInfo.Director || null
    };
    const data = await MovieService.createMovie(movie);

    handleData({data, res});
  })

export default MoviesController;