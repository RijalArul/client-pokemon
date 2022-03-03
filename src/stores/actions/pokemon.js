import axios from 'axios'
import API_POKEMON_URL from '../../axios'
import { SET_POKEMONS, SET_POKEMON, SET_ERROR } from '../keys'

export function setPokemons (payload) {
  return {
    type: SET_POKEMONS,
    payload
  }
}

export function setPokemon (payload) {
  return {
    type: SET_POKEMON,
    payload
  }
}

export function setError (payload) {
  return {
    type: SET_ERROR,
    payload
  }
}

export function fetchPokemons () {
  return async function (dispatch, getState) {
    try {
      const resp = await API_POKEMON_URL.get(`/pokemons`)
      const { data } = resp
      dispatch(setPokemons(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function fetchPokemon (payload) {
  return async function (dispatch, getState) {
    try {
      const resp = await API_POKEMON_URL.get(`/pokemons/${payload}`)
      const { data } = resp
      dispatch(setPokemon(data))
    } catch (err) {
      const { data, status } = err.response
      const errors = {
        data: data,
        status: status
      }
      dispatch(setError(errors))
    }
  }
}
