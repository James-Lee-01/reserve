import axios from 'axios'
//baseUrl
const baseUrl = 'https://localhost:3001'
// const baseUrl = 'https://cafe-reservation-6f0a1b76e65e.herokuapp.com/api'

//time list(user)
export const getTimes = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/times`)
    if (data)
    return data
  } catch (error) {
    console.error('[Get Time Failed]', error)
    return error
  }
}


