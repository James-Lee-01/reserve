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

//get cafe all reservations
export const getCafeResvs = async (cafeId) => {
  try {
    const { data } = await axiosInstance.get(`/reservations/${cafeId}`)
    console.log(data)
    return data
  } catch (error) {
    console.error('[getCafeResvs Failed]', error)
    return error
  }
}

//Store Delete Reservation
export const deleteResv = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/reservations/${id}`)
    console.log(data.status)
    return data
  } catch (error) {
    console.error('[deleteResv Failed]', error)
    return
  }
}

//post new cafe
export const postCafe = async (cafeData) => {
  try {
    const { data } = await axiosInstance.post('/cafes', cafeData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    console.log(data)
    return data
  } catch (error) {
    console.error('[postCafe Failed]:', error);
    return error
  }
};

//post new cafe times
export const postTimes = async ({cafeId, timeslots}) => {
  try {
    const { data } = await axiosInstance.post('/times/bulk', {
      cafeId,
      timeslots,
    });
    console.log(data)
    return data
  } catch (error) {
    console.error('[postTimes Failed]:', error);
    return error
  }
};

//post new cafe seat
export const postTables = async ({cafeId, tables}) => {
  try {
    const { data } = await axiosInstance.post('/tables/bulk', {
      cafeId,
      tables,
      });
    console.log(data)
    return data
  } catch (error) {
    console.error('[postTables Failed]:', error);
    return error
  }
};

//Update store info
export const putCafe = async (formData, id) => {
  try {
    const { data } = await axiosInstance.put(`/cafes/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data
  } catch (error) {
    console.log("[putCafe Failed]:", error);
    return error
  }
};

//get cafe all times
export const getTimes = async (cafeId) => {
  try {
    const { data } = await axiosInstance.get(`/times/${cafeId}`)
    console.log(data)
    return data
  } catch (error) {
    console.error('[getTimes Failed]', error)
    return error
  }
}

//post cafe single time
export const postTime = async ({cafeId, timeslot}) => {
  try {
    const { data } = await axiosInstance.post(`/times`, {
      cafeId, 
      timeslot,
    })
    console.log(data)
    return data
  } catch (error) {
    console.error('[postTime Failed]', error)
    return error
  }
}

//delete cafe single time
export const deleteTime = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/times/${id}`)
    console.log(data)
    return data
  } catch (error) {
    console.error('[deleteTime Failed]', error)
    return error
  }
}

//get cafe all tables
export const getTables = async (cafeId) => {
  try {
    const { data } = await axiosInstance.get(`/tables/${cafeId}`)
    console.log(data)
    return data
  } catch (error) {
    console.error('[getTables Failed]', error)
    return error
  }
}

//Change cafe single table count
export const putTable = async ({count, id}) => {
  console.log(`[putTable`, count, id)
  try {
    const { data } = await axiosInstance.put(`/tables/${id}`,
      {
        count,
      }
    );
    return data
  } catch (error) {
    console.log("[putTable Failed]:", error);
    return error
  }
};

//Add cafe single time
export const postTable = async ({cafeId, seat, count}) => {
  try {
    const { data } = await axiosInstance.post(`/tables`, {
      cafeId, 
      seat,
      count,
    })
    console.log(data)
    return data
  } catch (error) {
    console.error('[postTable Failed]', error)
    return error
  }
}

//delete cafe single time
export const deleteTable = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/tables/${id}`)
    console.log(data)
    return data
  } catch (error) {
    console.error('[deleteTable Failed]', error)
    return error
  }
}

//empty time
export const postEmptyTime = async ({id, startDate, seat,}) => {
  try {
    const { data } = await axiosInstance.post(`/cafes/${id}/empty`, {
      startDate, 
      seat,
    })
    console.log(data)
    return data
  } catch (error) {
    console.error('[postEmptyTime Failed]', error)
    return error
  }
}

//reservation
export const postResv = async ({cafeId, date, timeslot, seat, tel, note,}) => {
  try {
    const { data } = await axiosInstance.post(`/reservations`, {
      cafeId,
      date, 
      timeslot,
      seat,
      tel,
      note,
    })
    console.log(data)
    return data
  } catch (error) {
    console.error('[postResv Failed]', error)
    return error
  }
}

//get user reservation
export const getResvs = async () => {
  try {
    const { data } = await axiosInstance.get(`/reservations`)
    console.log(data)
    return data
  } catch (error) {
    console.error('[getResvs Failed]', error)
    return error
  }
}

//Search
export const postSearch = async ({ date, timeslot, seat, city,}) => {
  try {
    const { data } = await axiosInstance.post(`/cafes/search`, {
      date, 
      timeslot,
      seat,
      city,
    })
    console.log(data)
    return data
  } catch (error) {
    console.error('[postSearch Failed]', error)
    return error
  }
}