import axios from 'axios'

export const API_URL = 'http://localhost:3000'

const ApiService = {
  registerUser: async (tel: string | null, password: string | null, name: string | null) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { tel, password, name })
      return response.data
    } catch (error) {
      console.error('Error registering user: ', error)
      throw error
    }
  },

  registerAdmin: async (
    tel: string | null,
    password: string | null,
    name: string | null,
    token: string | null,
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register-admin`,
        { tel, password, name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data
    } catch (error) {
      console.error('Error registering user: ', error)
      throw error
    }
  },

  loginAdmin: async (tel: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login-admin`, { tel, password })
      return response.data
    } catch (error) {
      console.error('Error logging in: ', error)
      throw error
    }
  },

  deleteUser: async (token: string | null, userId: string | null) => {
    try {
      const response = await axios.delete(`${API_URL}/users/delete?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Error deleting a user: ', error)
      throw error
    }
  },

  getAllUsers: async (token: string | null) => {
    try {
      const response = await axios.get(`${API_URL}/info/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Error getting all users: ', error)
      throw error
    }
  },

  createRoom: async (
    token: string | null,
    number: string | null,
    name: string | null,
    description: string | null,
    price: number | null,
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/rooms/create`,
        {
          number,
          name,
          description,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data
    } catch (error: any) {
      console.error('Error creating room: ', error)
      throw error
    }
  },

  addThumbnailToRoom: async (token: string | null, formData: FormData) => {
    try {
      const response = await axios.post(`${API_URL}/rooms/add-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Error adding thumbnail to room: ', error)
      throw error
    }
  },

  deleteRoomImage: async (token: string | null, roomId: number, imageUrl: string) => {
    try {
      const response = await axios.delete(`${API_URL}/rooms/delete-image`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { roomId, imageUrl }, // Pass body as `data` in DELETE requests
      })
      return response.data
    } catch (error: any) {
      console.error('Error deleting room image:', error)
      throw error
    }
  },

  editRoomImage: async (token: string | null, formData: FormData) => {
    try {
      const response = await axios.put(`${API_URL}/rooms/edit-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Error editing room image:', error)
      throw error
    }
  },

  updateRoom: async (
    token: string | null,
    roomId: number | null,
    number: string | null,
    name: string | null,
    description: string | null,
    price: number | null,
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/rooms/edit?id=${roomId}`,
        {
          number,
          name,
          description,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data
    } catch (error: any) {
      console.error('Error updating room: ', error)
      throw error
    }
  },

  deleteRoom: async (token: string | null, roomId: string | null) => {
    try {
      const response = await axios.delete(`${API_URL}/rooms/delete?id=${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Error deleting a room: ', error)
      throw error
    }
  },

  getAllRooms: async (token: string | null) => {
    try {
      const response = await axios.get(`${API_URL}/info/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Error getting all rooms: ', error)
      throw error
    }
  },

  getAllBookings: async (token: string | null) => {
    try {
      const response = await axios.get(`${API_URL}/info/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Error getting all bookings: ', error)
    }
  },
}

export default ApiService
