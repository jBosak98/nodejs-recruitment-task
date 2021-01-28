import {User, UserDocType, UserType} from "./User";
import bcrypt from 'bcrypt'
import Validated from "../../lib/Validated";
import isNil from 'lodash/isNil';

type Credentials = {
  username: string,
  password: string
}

const prepareResponse = (promise: Promise<any>) => promise
  .then(e => ({error: false, data: dbModelToLogic(e)}))
  .catch(e => ({error: true, errors: e}))

const register = async ({username, password: rawPassword, _id, role, name}: UserDocType) => {
  const encrypted = await bcrypt.hash(rawPassword, 10);
  return prepareResponse(User.create({
    username,
    password: encrypted,
    _id,
    role,
    name
  }));
}

const dbModelToLogic = ({username, password, _id, role, name}:any): UserType => ({username, password, id:_id, role, name})


const login = async ({username, password}: Credentials) => {
  const user = await User.findOne({username});
  if (isNil(user)) {
    return Validated.error<UserType>({message: "User not found"});
  }

  const logged = bcrypt.compareSync(password, user.password);
  if (!logged) {
    return Validated.error<UserType>({message: "Password is not correct"});
  }

  return Validated.success<UserType>(dbModelToLogic(user))
}


export {login, register}