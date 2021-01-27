import mongoose, {Schema} from "mongoose";

type MovieType = {
  _id: String,
  title: String,
  released: Date,
  genre: String,
  directory: String
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
  directory: {
    type: String,
    required: false
  },
  owner: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
})
const Movie = mongoose.model("Movie", movieSchema);
export {Movie, MovieType}