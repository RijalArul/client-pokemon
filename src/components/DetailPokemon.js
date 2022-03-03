import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPokemon } from '../stores/actions/pokemon'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { addCatches, setError } from '../stores/actions/catch'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DetailPokemon () {
  let params = useParams()
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const [chartData, setChartData] = useState({
    datasets: []
  })
  const [chartOptions, setChartOptions] = useState({})

  const { pokemon, errorStatus } = useSelector(state => state.pokemons)
  const {
    errorCatchData,
    errorCatchStatus,
    successCatchesStatus
  } = useSelector(state => state.catches)
  useEffect(() => {
    if (successCatchesStatus == 201) {
      Swal.fire('Good job!', `You got your pokemon ${params.name}!`, 'success')
      setTimeout(() => {
        navigate('/catch')
      }, 2000)
    } else if (errorStatus == 404) {
      navigate(`/not_found`)
    } else if (errorCatchStatus == 400) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must try again!'
      })
      dispatch(setError(''))
    } else {
      dispatch(fetchPokemon(params.name))
    }
  }, [dispatch, errorCatchStatus, successCatchesStatus])

  let statsPoke = []
  useEffect(() => {
    if (chartData !== null && chartOptions !== null) {
      pokemon.data?.stats.map(stat => {
        statsPoke.push(stat.base_stat)
        setChartData({
          labels: [
            'hp',
            'attack',
            'defense',
            'special-attack',
            'special-defence',
            'speed'
          ],
          datasets: [
            {
              data: [
                statsPoke[0],
                statsPoke[1],
                statsPoke[2],
                statsPoke[3],
                statsPoke[4],
                statsPoke[5]
              ],
              label: 'Power Heroes',
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: [
                'rgba(0, 247, 128, 0.8)',
                'rgba(219, 0, 0, 0.74)',
                'rgba(38, 188, 7, 0.74)',
                'rgba(11, 95, 185, 0.85)',
                'rgba(242, 127, 70, 0.85)',
                'rgba(245, 213, 70, 0.85)'
              ]
            }
          ]
        })
      })

      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Strengths'
          }
        }
      })
    }
  }, [])
  function catchPokemon (id) {
    dispatch(addCatches(id))
  }

  let types = []
  let abilties = []
  return (
    <div>
      <div>
        <h1>{pokemon.data?.species.name}</h1>
        <div>
          {pokemon.data?.types.map(type => {
            const { name } = type.type
            types.push(name)
          })}
          {pokemon.data?.abilities.map(ability => {
            const { name } = ability.ability
            abilties.push(name)
          })}
          <h2>type: </h2>
          <h4>{types.join(' , ')}</h4>
          <h2>abilities: </h2>
          <h4>{abilties.join(' , ')}</h4>;
          <button
            type='button'
            class='btn btn-outline-danger'
            onClick={() => catchPokemon(pokemon.data?.id)}
          >
            Catch Now!!
          </button>
        </div>
        <img src={pokemon.data?.sprites.other.dream_world.front_default} />
      </div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  )
}
