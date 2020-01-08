import axios from 'axios'

const instance = axios.create({
  baseURL:`http://192.168.30.147:${process.env.PORT||3000}`,
  timeout:2000,
  headers:{

  }
})

export default instance