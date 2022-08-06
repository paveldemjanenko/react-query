// import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  // const [interval, setInterval] = useState(3000);

  const onSuccess = (data) => {
    console.log('Perform side effect after fata fetching', data)
    // if (data.data.length === 4) setInterval(false)
  };
  const onError = (error) => {
    // setInterval(false)
    console.log('Perform side effect after encountering error', error)
  };

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // cacheTime: 5000,
      // staleTime: 3000,
      // refetchOnMount: true,
      // refetchOnWindowFocus: 'always',
      // refetchInterval: interval, //interval for data pull
      // refetchIntervalInBackground: true, //will pull data in background
      
      //Will fetch data on button click (enable set to fals and add button)
      // enabled: false,

      onSuccess,
      onError,
      select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name)
        return superHeroNames
      }
    }
  )

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page </h2>
      <button onClick={refetch}>Fetch heroes</button>
      {/* {
        data?.data.map((hero) => {
          return <div key={hero.name}>{hero.name}</div>
        })
      } */}
      {
        data.map((heroName) => {
          return <div key={heroName}>{heroName}</div>
        })
      }
    </>
  )
}
