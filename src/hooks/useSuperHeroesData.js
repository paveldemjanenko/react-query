import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const useSuperHeroesData = (onSuccess, onError, enabled) => {
  return useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      enabled,
      onSuccess,
      onError,
      // select: (data) => {
      //   const superHeroNames = data.data.map((hero) => hero.name)
      //   return superHeroNames
      // }
    }
  )
}

const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes', hero)
}

export const useAddSuperHeroeData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    onSuccess: () => {
      queryClient.invalidateQueries('super-heroes')
    }
  })
}
