import { useQuery } from "react-query"
import axios from "axios"

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends')
}

export const ParallelQueriesPage = () => {
  //To use parallel queries just invoke useQuery multiple times
  //We can use aliasies to distinguish from similar data
  const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes)
  const { data: friends } = useQuery('friends', fetchFriends)

  return <div>Parallel Queries Page</div>
}
