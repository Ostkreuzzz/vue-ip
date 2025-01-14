import { client } from '@/api/httpClient'

const IP_API = 'at_EooHLAYkzqX4Lukr4DZhEiBfF9R9p'
export const MAPS_API = 'AIzaSyBP1Bi1NbGW5R7eg42Yp2rmRu8_ufypRGU'

export async function getIPData(ip: string) {
  return client.get(`/country,city?apiKey=${IP_API}&ipAddress=${ip}`)
}
