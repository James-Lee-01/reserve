import axios from 'axios'
//baseUrl
// const baseUrl = 'https://localhost:3001'
const baseUrl = 'https://cafe-reservation-6f0a1b76e65e.herokuapp.com/api'

//time list(user)
export const getTimeSlots = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/times/timeslots`)
    if (data)
    return data
  } catch (error) {
    console.error('[Get Time Failed]', error)
    return error
  }
}

//table list(user)
export const getSeats = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/tables/seats`)
    if (data)
    return data
  } catch (error) {
    console.error('[Get Table Failed]', error)
    return error
  }
}
