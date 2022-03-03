import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CardPokemon ({ pokemon }) {
  let navigate = useNavigate()

  function redirectDetail (name) {
    navigate(`/${name}`)
  }
  return (
    <div class='col'>
      <div class='card shadow p-3 mb-5 bg-white rounded'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/375px-Pokebola-pokeball-png-0.png'
          class='card-img-top class-pokemon'
        />
        <div class='card-body'>
          <h5 class='card-title'>{pokemon.name}</h5>
          <button
            type='button'
            class='btn btn-outline-primary'
            onClick={() => redirectDetail(pokemon.name)}
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  )
}
