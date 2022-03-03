import axios from 'axios'

const API_POKEMON_URL = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 30000
})

export default API_POKEMON_URL
