import {Movie, MovieType} from "./Movie";

const prepareResponse = (promise: any) => promise
  .then((e: MovieType[] | MovieType) => ({
    error: false,
    data: Array.isArray(e) ? dbModelsToLogic(e) : dbModelToLogic(e)
  }))
  .catch((e: any) => {
    console.error(e);
    return {error: true, errors: e._message ? [e._message] : e};
  })

const createMovie = (movieInput:any) => prepareResponse(Movie.create(movieInput))

const listMovies = () => prepareResponse(Movie.find())

const dbModelToLogic = ({_id, title, released, genre, directory}: MovieType) => ({
  id: _id,
  title,
  released,
  genre,
  directory
})
const dbModelsToLogic = (movies: MovieType[]) => movies.map(m => dbModelToLogic(m))

export default {createMovie, listMovies}