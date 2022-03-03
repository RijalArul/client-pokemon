import API_POKEMON_URL from '../../axios'
import { SET_CATCH, SET_CATCHES, SET_ERROR } from '../keys'

export function setCatches (data, payload) {
  return {
    type: SET_CATCHES,
    data,
    payload
  }
}

export function setCatch (data, payload) {
  return {
    type: SET_CATCH,
    data,
    payload
  }
}

export function setError (payload) {
  return {
    type: SET_ERROR,
    payload
  }
}

export function fetchCatches () {
  return async function (dispatch, getState) {
    try {
      const response = await API_POKEMON_URL.get('/bookmarks')
      const { data, status } = response

      dispatch(setCatches(data, status))
    } catch (err) {
      console.log(err)
    }
  }
}

export function addCatches (payload) {
  return async function (dispatch, getState) {
    try {
      let stateCatches = getState().catches.catches
      const response = await API_POKEMON_URL.post(`/bookmarks/catch/${payload}`)

      const { data } = response.data

      stateCatches = [...stateCatches, data]
      dispatch(setCatches(stateCatches, response.status))
    } catch (err) {
      const errors = {
        data: err.response?.data,
        status: err.response?.status
      }
      dispatch(setError(errors))
    }
  }
}

export function releasedCatches (payload) {
  return async function (dispatch, getState) {
    try {
      let stateCatches = getState().catches.catches
      const response = await API_POKEMON_URL.delete(
        `/bookmarks/release/${payload}`
      )
      const filterCathches = stateCatches.filter(
        catches => catches.id !== payload
      )
      dispatch(setCatches(filterCathches, response.status))
    } catch (err) {
      const errors = {
        data: err.response?.data,
        status: err.response?.status
      }
      dispatch(setError(errors))
    }
  }
}

export function renameCathces (payload) {
  return async function (dispatch, getState) {
    try {
      const response = await API_POKEMON_URL.put(`/bookmarks/rename/${payload}`)
      const { data } = response.data
      let stateCatches = getState().catches.catches
      let catchs = getState().catches.catch
      const findCatches = stateCatches.findIndex(el => el.id === data.id)
      stateCatches[findCatches] = data
      catchs = stateCatches[findCatches]
      dispatch(setCatch(catchs, response.status))
    } catch (err) {
      console.log(err)
    }
  }
}
