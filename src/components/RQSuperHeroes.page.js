// import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

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

  const { data, isLoading, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)

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
      {
        data?.data.map((hero) => {
          return <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        })
      }
      {/* {
        data?.map((heroName) => {
          return <div key={heroName}>{heroName}</div>
        })
      } */}
    </>
  )
}
