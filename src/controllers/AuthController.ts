import express from "express";
import getSecretJWT from "../lib/getSecretJWT";
import {authFactory} from "../auth";

const JWT_SECRET = getSecretJWT();
const auth = authFactory(JWT_SECRET);
const AuthController = express.Router();

AuthController.post("/", async(req, res, next) => {
  if (!req.body) {
    return res.status(400).json({error: "invalid payload"});
  }

  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({error: "invalid payload"});
  }

  try {
    const token = await auth(username, password);

    return res.status(200).json({token});
  } catch (error) {
    //unfortunately, instanceof is not working properly in typescript, source: https://github.com/Microsoft/TypeScript/issues/13965
    if (error.hasOwnProperty('type') && error.type === 'AuthError') {
      return res.status(401).json({error: error.message});
    }

    next(error);
  }
});
export default AuthController;