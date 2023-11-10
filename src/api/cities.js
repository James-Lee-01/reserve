import axios from 'axios'
//baseUrl
// const baseUrl = 'https://localhost:3001'
const baseUrl = 'https://cafe-reservation-6f0a1b76e65e.herokuapp.com/api'

//time list(user)
export const getCities = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/cities`)
    if (data)
    return data
  } catch (error) {
    console.error('[Get City Failed]', error)
    return error
  }
}