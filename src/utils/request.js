import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'https://bsc-api.somee.com/api/', // url = base url + request url
  timeout: 5000 // request timeout
})



service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
 
      return Promise.reject(response.data)
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error.response)
  }
)

export default service
