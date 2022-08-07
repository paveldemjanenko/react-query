import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAddSuperHeroeData, useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data) => {
    console.log('Perform side effect after fata fetching', data)
  };
  const onError = (error) => {
    console.log('Perform side effect after encountering error', error)
  };

  const { data, isLoading, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)

  const { mutate: addHero, isLoading: addIsLoading, isError: addIsError, error: addError } = useAddSuperHeroeData()

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo })
    const hero = { name, alterEgo }
    addHero(hero)
  }

  if (isLoading || isFetching || addIsLoading) {
    return <h2>Loading...</h2>
  }

  if (isError || addIsError) {
    return <h2>{error.message} || {addError.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page </h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch heroes</button>
      {
        data?.data.map((hero) => {
          return <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        })
      }
    </>
  )
}
