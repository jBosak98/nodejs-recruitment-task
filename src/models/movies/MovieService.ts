import {DBMovieType, Movie} from "./Movie";

const prepareResponse = async (promise: any) => await promise
  .then((e: DBMovieType[] | DBMovieType) => ({
    error: false,
    data: Array.isArray(e) ? dbModelsToLogic(e) : dbModelToLogic(e)
  }))
  .catch((e: any) => {
    console.error(e);
    return {error: true, errors: e._message ? [e._message] : e};
  })

const createMovie = (movieInput:any) => prepareResponse(Movie.create(movieInput))

const listMovies = () => prepareResponse(Movie.find())

const dbModelToLogic = ({_id, title, released, genre, director}: DBMovieType) => ({
  id: _id,
  title,
  released,
  genre,
  director
})
const dbModelsToLogic = (movies: DBMovieType[]) => movies.map(m => dbModelToLogic(m))

export default {createMovie, listMovies}