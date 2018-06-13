import Vue from 'vue'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

const service = axios.create({
  baseURL: 'http://www.5icoding.top/api',
  //baseURL: 'http://www.5icoding.top/api',
  //baseURL: 'http://127.0.0.1:8081/api',
  withCredentials: true,
})

service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if(error.response&&error.response.status===401){
      store.dispatch('SHOWLONGINTYPE', 0)
    }else{
      return Promise.reject(error)
    }
  }
)

export default service
