import { useQueries } from "react-query"
import axios from "axios"

const fetchSuperHeroe = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHeroe(id)
      }
    })
  )
  // console.log(queryResults)
  console.log({ queryResults })
  return <div>DynamicParallelPage</div>
}
