import mongoose, {Document} from "mongoose";

type UserType = {
  id: number,
  role:string,
  username:string,
  password:string,
  name:string
}
type UserDocType = {
  _id: number,
  role:string,
  username:string,
  password:string,
  name:string
}

interface UserDoc extends Document {
  _id: number,
  role:string,
  username:string,
  password:string,
  name:string
}

const UserSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    index: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type:String
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model<UserDoc>('User', UserSchema);

export {User, UserType, UserDocType};