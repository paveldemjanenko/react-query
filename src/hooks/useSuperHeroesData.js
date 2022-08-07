import { useQuery, useMutation, useQueryClient } from 'react-query'
// import axios from 'axios';
import { request } from '../utils/axios-utils' 

const fetchSuperHeroes = () => {
  // return axios.get('http://localhost:4000/superheroes')
  return request({ url: '/superheroes' })
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
  // return axios.post('http://localhost:4000/superheroes', hero)
  return request({ url: 'superheroes', method: 'post', data: hero })
}

export const useAddSuperHeroeData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries('super-heroes')

    //   //oldQueryData is data from cache
    //   queryClient.setQueriesData('super-heroes', (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data]
    //     }
    //   })
    // }
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes')
      //Will help rollback if update fails
      const previousHeroData = queryClient.getQueriesData('super-heroes')
      queryClient.setQueriesData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newHero}]
        }
      })
      return {
        previousHeroData
      }
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueriesData('super-heroes', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    }
  })
}
