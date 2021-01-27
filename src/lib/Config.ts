import dotenv from 'dotenv';
dotenv.config()

const {
  JWT_SECRET,
  DB_URI
} = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

if (!DB_URI) {
  throw new Error("Missing DB_URI env var. Set it and restart the server");
}


export default {
  JWT_SECRET,
  DB_URI
}