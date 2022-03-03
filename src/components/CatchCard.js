import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  releasedCatches,
  renameCathces,
  setError
} from '../stores/actions/catch'

export default function CardCatch ({ catchs }) {
  const { errorStatus } = useSelector(state => state.pokemons)
  const { errorCatchStatus } = useSelector(state => state.catches)

  let navigate = useNavigate()
  let dispatch = useDispatch()
  useEffect(() => {
    if (errorStatus == 404) {
      navigate(`/not_found`)
    } else if (errorCatchStatus == 400) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must try again!'
      })
      dispatch(setError(''))
    }
  }, [errorCatchStatus])
  function clickReleased (id) {
    dispatch(releasedCatches(id))
  }

  function clickRename (id) {
    dispatch(renameCathces(id))
  }
  return (
    <div class='col'>
      <div class='card shadow p-3 mb-5 bg-white rounded'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/375px-Pokebola-pokeball-png-0.png'
          class='card-img-top class-pokemon'
        />
        <div class='card-body'>
          <h5 class='card-title'>{catchs.name}</h5>
          <button
            type='button'
            class='btn btn-danger'
            onClick={() => clickReleased(catchs.id)}
          >
            Released
          </button>
          <button
            type='button'
            class='btn btn-success ms-2'
            onClick={() => clickRename(catchs.id)}
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  )
}
