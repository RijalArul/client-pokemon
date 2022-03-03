import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardCatch from '../components/CatchCard'
import { fetchCatches } from '../stores/actions/catch'

export default function CatchPage () {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const { catches } = useSelector(state => state.catches)
  useEffect(() => {
    dispatch(fetchCatches())
  }, [])
  function clickHomePage () {
    navigate('/')
  }
  return (
    <div>
      <div class='text-center mb-5'>
        <h3 class='mb-2'> Catch Page</h3>
        <button
          type='button'
          class='btn btn-primary mb-2'
          onClick={() => clickHomePage()}
        >
          Home
        </button>
        <div class='row row-cols-1 row-cols-md-3 g-4'>
          {catches &&
            catches.map(catchs => {
              return <CardCatch catchs={catchs} />
            })}
        </div>
      </div>
    </div>
  )
}
