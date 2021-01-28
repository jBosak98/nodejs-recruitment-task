import express, {Request} from 'express';
import MovieService from "../models/movies/MovieService";
import getOmdbLink from '../lib/getOmdbLink';
import fetch from 'node-fetch';
import {Movie, MovieType} from "../models/movies/Movie";
import moment from 'moment';
import AccessLevel from "../models/AccessLevel";

const MoviesController = express.Router();


const handleData = ({data, res}: { data: any, res: any }) => {
  if (data.error) {
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
    const {role, userId} = req.auth;
    if (role === AccessLevel.basic) {
      const moviesInMonth = await MovieService.countRequestsAtThisMonth(userId);
      if (moviesInMonth >= 5) {
        return res.status(429).json({message: 'you have exceeded the limit'});
      }
    }
    const requestLink = getOmdbLink(req.body.title);
    const additionalRequest = await fetch(requestLink);
    const additionalInfo = await additionalRequest.json();

    const movie: MovieType = {
      title: req.body.title,
      owner: userId,
      released: Date.parse(additionalInfo.Released) ? new Date(additionalInfo.Released) : null,
      genre: additionalInfo.Genre || null,
      director: additionalInfo.Director || null,
      createdAt: new Date()
    };
    const data = await MovieService.createMovie(movie);

    handleData({data, res});
  });

MoviesController.get('/', async (req, res, next) => {
  const {userId} = req.auth;
  const data = await MovieService.listMoviesByUserId(userId);
  handleData({data, res});
})

export default MoviesController;