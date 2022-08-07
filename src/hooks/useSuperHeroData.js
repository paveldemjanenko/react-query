import { useQuery } from 'react-query'
import axios from 'axios';

// const fetchSuperHero = (heroId) => {
const fetchSuperHero = ({ queryKey }) => {
  //queryKey is ['super-hero', heroId] that is auto passd to fetcher function
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

// export const useSuperHeroData = (heroId) => {
//   //We need to use heroId as seconf key parameter as this will allow for query cache to see the difference between super-hero data
//   return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId))
// }

//Simplified code above
export const useSuperHeroData = (heroId) => {
  //We need to use heroId as seconf key parameter as this will allow for query cache to see the difference between super-hero data
  return useQuery(['super-hero', heroId], fetchSuperHero)
}