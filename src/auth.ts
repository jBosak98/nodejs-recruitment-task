import jwt, {Secret} from "jsonwebtoken";
import {login} from './models/users/UserService';


export class AuthError extends Error {
  type = 'AuthError';
}

export const authFactory = (secret: Secret) => async (username: string, password: string) => {
  const wrappedUser = await login({username, password});

  if (!wrappedUser.succeed) {
    throw new AuthError("invalid username or password");
  }
  const user = wrappedUser.value;

  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      role: user.role,
    },
    secret,
    {
      issuer: "https://www.netguru.com/",
      subject: `${user.id}`,
      expiresIn: 30 * 60,
    }
  );
};

