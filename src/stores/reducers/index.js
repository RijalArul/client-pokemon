import { combineReducers } from 'redux'
import catchReducer from './catch'
import pokemonReducer from './pokemon'

const reducer = combineReducers({
  pokemons: pokemonReducer,
  catches: catchReducer
})

export default reducer
