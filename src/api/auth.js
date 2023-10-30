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

//api
//login(user only)
export const userLogin = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/login`, {
      email,
      password,
    })

    //驗證角色身份
    const status = data.status
    const authToken = data.token
    const message = data.message
    const role = data.role

    //若角色符合user
    if (status === 'success') {
      // console.log(status)
      // console.log(authToken)
      // console.log(data)
      return { success: true, authToken, message, role}
    } else {
      //顯示錯誤訊息(暫時)
      console.error('帳號不存在')
      return { success: false, message: data.response.data.message }
    }
  } catch (error) {
    console.error(`[Get User failed]: `, error)
    return { success: false, message: error.response.data.message }
  }
}

//signup(user)
export const userSignUp = async ({ name, email, password, checkPassword }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/signup`, {
      name,
      email,
      password,
      checkPassword,
    })
    return data
  } catch (error) {
    console.error('[SignUp Failed]', error)
    return error
  }
}


//Get User Info Data
export const getUser = async (userId) => {
  try {
    const { data } = await axiosInstance.get(`/users/${userId}`)
    if (data)
    return data
  } catch (error) {
    console.error('[Get user info Failed], error')
    return error
  }
}


//Setting user account
export const putAccount = async ({ name, email, password, checkPassword, userId }) => {
  try {
    const { data } = await axiosInstance.put(`/users/${userId}/account`, {
      name,
      email,
      password,
      checkPassword,
    })
    return data
  } catch (error) {
    console.error('[Set account Failed]', error)
    console.log(error.message)
    return error
  }
}