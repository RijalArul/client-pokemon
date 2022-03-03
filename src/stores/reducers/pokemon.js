import { SET_ERROR, SET_POKEMON, SET_POKEMONS } from '../keys'
const INITIAL_STATE = {
  pokemons: [],
  pokemon: {},
  errorData: {},
  errorStatus: 0
}

function pokemonReducer (state = INITIAL_STATE, action) {
  const { payload, type } = action
  switch (type) {
    case SET_POKEMONS:
      return { ...state, pokemons: payload }
    case SET_POKEMON:
      return { ...state, pokemon: payload }
    case SET_ERROR:
      return {
        ...state,
        errorData: payload.data,
        errorStatus: payload.status
      }
    default:
      return state
  }
}

export default pokemonReducer
