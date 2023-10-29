import axios from 'axios'
//baseUrl
const baseUrl = 'https://localhost:3001'
// const baseUrl = 'https://cafe-reservation-6f0a1b76e65e.herokuapp.com/api'

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

//get all cafes
export const getAllCafes = async () => {
  try {
    const { data } = await axiosInstance.get('/cafes')
    console.log(data)
    return data
  } catch (error) {
    console.error('[getAllCafes Failed]', error)
    return error
  }
}