import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CardPokemon from '../components/CardPokemon'
import { fetchPokemons } from '../stores/actions/pokemon'
import { useNavigate } from 'react-router-dom'
export default function Home () {
  const { pokemons } = useSelector(state => state.pokemons)
  let navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPokemons())
  }, [dispatch])

  function clickCatchPage () {
    navigate(`/catch`)
  }
  return (
    <div>
      <div class='text-center mb-5'>
        <h3 class='mb-2'> Home Page</h3>
        <button
          type='button'
          class='btn btn-primary '
          onClick={() => clickCatchPage()}
        >
          Catch
        </button>
      </div>
      <div class='row row-cols-1 row-cols-md-3 g-4'>
        {pokemons &&
          pokemons.map(pokemon => {
            return <CardPokemon pokemon={pokemon} />
          })}
      </div>
    </div>
  )
}
