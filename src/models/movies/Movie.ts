import mongoose, {Schema} from "mongoose";
import { ObjectID } from 'mongodb';

type MovieType = {

  title: string,
  released: Date | null,
  genre: string | null,
  director: string | null,
  owner:number
}
type DBMovieType = MovieType & {
  _id: string,
}

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  released: {
    type: Date,
    required: false,
  },
  genre: {
    type: String,
    required: false
  },
  director: {
    type: String,
    required: false
  },
  owner: {
    type: Number, ref: 'User',
    required: true
  },
})
const Movie = mongoose.model("Movie", movieSchema);
export {Movie, MovieType, DBMovieType}