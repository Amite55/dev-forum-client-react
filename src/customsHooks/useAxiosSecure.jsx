
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
const useAxiosSecure = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()

  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    config.headers.authorization = `Bearer ${token}`;
    return config
  }, function (error) {
    return Promise.reject(error);
  })

  // ============= interceptors status 401 and 403 ============
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response.status;
    console.log('status error in the interceptor', status);
    if (status === 401 || status === 403) {
      await logOut();
      navigate('/login')
    }
    return Promise.reject(error)
  })

  return axiosSecure
}

export default useAxiosSecure