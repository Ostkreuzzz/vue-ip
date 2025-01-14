import axios from 'axios'

export const client = axios.create({
  baseURL: `https://geo.ipify.org/api/v2`,
})
