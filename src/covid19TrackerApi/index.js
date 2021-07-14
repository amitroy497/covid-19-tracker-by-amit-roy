import axios from 'axios'

export const getGlobalSummary = () => {
  return axios.get('https://api.covid19api.com/summary')
}

export const getRegionalSummary = () => {
  return axios.get('https://api.covid19india.org/data.json')
}
