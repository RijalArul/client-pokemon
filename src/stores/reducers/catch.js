import { SET_CATCH, SET_CATCHES, SET_ERROR } from '../keys'

const INITIAL_STATE = {
  catches: [],
  catch: {},
  errorCatchData: {},
  errorCatchStatus: 0,
  successCatchesStatus: 0
}

export default function catchReducer (state = INITIAL_STATE, action) {
  const { data, payload, type } = action
  switch (type) {
    case SET_CATCHES:
      return {
        ...state,
        catches: data,
        successCatchesStatus: payload,
        errorCatchStatus: 0
      }
    case SET_CATCH:
      return {
        ...state,
        catch: data,
        successCatchesStatus: payload,
        errorCatchStatus: 0
      }
    case SET_ERROR:
      return {
        ...state,
        errorCatchData: payload.data,
        errorCatchStatus: payload.status
      }
    default:
      return state
  }
}
