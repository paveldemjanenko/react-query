import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesCustomPage = ({ enabled = false}) => {
  const onSuccess = (data) => {
    console.log('Perform side effect after fata fetching', data)
  };

  const onError = (error) => {
    console.log('Perform side effect after encountering error', error)
  };

  const { data, isLoading, isError, error, isFetching, refetch } = useSuperHeroesData(
    onSuccess,
    onError,
    enabled,
)

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Custom Page </h2>
      <button onClick={refetch}>Fetch heroes</button>
      {
        data?.map((heroName) => {
          return <div key={heroName}>{heroName}</div>
        })
      }
    </>
  )
}
