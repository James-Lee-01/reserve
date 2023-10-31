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

//get single cafes
export const getCafe = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/cafes/${id}`)
    console.log(data)
    return data
  } catch (error) {
    console.error('[getCafe Failed]', error)
    return error
  }
}

//post cafe favorite
export const postFavorite = async (cafeId) => {
  try {
    await axiosInstance.post(`/favorites/${cafeId}`);
  } catch (error) {
    console.error('[postFavorite Failed]:', error);
    return error
  }
};

//post cafe unfavorite
export const deleteFavorite = async (cafeId) => {
  try {
    await axiosInstance.delete(`/favorites/${cafeId}`);
  } catch (error) {
    console.error('[deleteFavorite Failed]:', error);
    return error
  }
};

//get all favorite cafes
export const getFavoriteCafes = async () => {
  try {
    const { data } = await axiosInstance.get('/favorites')
    console.log(data)
    return data
  } catch (error) {
    console.error('[getFavoriteCafes Failed]', error)
    return error
  }
}

//get all my cafes
export const getOwnCafes = async () => {
  try {
    const { data } = await axiosInstance.get('/cafes/owner')
    console.log(data)
    return data
  } catch (error) {
    console.error('[getOwnCafes Failed]', error)
    return error
  }
}