import dotenv from 'dotenv';

dotenv.config()

const {
  JWT_SECRET,
  DB_URI,
  OMDB_KEY
} = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

if (!DB_URI) {
  throw new Error("Missing DB_URI env var. Set it and restart the server");
}
if (!OMDB_KEY) {
  throw new Error("Missing OMDB_KEY env var. Set it and restart the server");
}

const OMDB_API = 'https://www.omdbapi.com/';

export const defaultUsers = [
  {
    id: 123,
    role: "basic",
    name: "Basic Thomas",
    username: "basic-thomas",
    password: "sR-_pcoow-27-6PAwCD8",
  },
  {
    id: 434,
    role: "premium",
    name: "Premium Jim",
    username: "premium-jim",
    password: "GBLtTyq3E_UNjFnpo9m6",
  },
];

export default {
  JWT_SECRET,
  DB_URI,
  OMDB_KEY,
  OMDB_API
}