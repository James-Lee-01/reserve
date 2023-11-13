import axios from 'axios'
//baseUrl
// const baseUrl = 'https://localhost:3001'
const baseUrl = 'https://cafe-reservation-6f0a1b76e65e.herokuapp.com/api'

//////////axiosInstance/////////////
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);
//////////////////////////////////

//api
// get all available cafes
export const getCafes = async () => {
  try {
    const { data } = await axiosInstance.get('/admin/cafes')
    console.log(data)
    return data
  } catch (error) {
    console.error('[Admin getCafes Failed]', error)
    return error
  }
}

// delete cafe
export const deleteCafe = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/admin/cafes/${id}`)
    console.log(data)
    return data
  } catch (error) {
    console.error('[Admin deleteCafe Failed]', error)
    return error
  }
}

// delete history reservation
export const deleteOldResvs = async () => {
  try {
    const { data } = await axiosInstance.delete('/admin/reservations')
    console.log(data)
    return data
  } catch (error) {
    console.error('[Admin deleteOldResvs Failed]', error)
    return error
  }
}