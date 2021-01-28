import Config from "../lib/Config";


const getOmdbLink = (title: string): string =>
  `${Config.OMDB_API}?${new URLSearchParams({
    t: title,
    apikey: Config.OMDB_KEY,
  })}`

export default getOmdbLink;