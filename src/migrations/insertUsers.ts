import {User} from '../models/users/User'
import {defaultUsers} from '../lib/Config';
import isNil from 'lodash/isNil';
import {register} from "../models/users/UserService";

const insertUsers = async () => {
  await Promise.all(defaultUsers.map(async (defaultUser) => {
    const {username} = defaultUser;
    const user = await User.findOne({username}).catch(e=> console.log(e));

    if (isNil(user)) {
      await register(
        {...defaultUser, _id:defaultUser.id
        });
    }

  }));
}

export default insertUsers;