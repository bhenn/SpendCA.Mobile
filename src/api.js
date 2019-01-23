import axios from 'axios';

const instance = axios.create({
  baseURL: "https://spendcadev.azurewebsites.net/api/"
});

instance.defaults.headers.common["Accept"] = "application/json"
instance.defaults.headers.common["Content-Type"] = "application/json"


export function setToken(token) {
  instance.defaults.headers.common["authorization"] = "Bearer " + token;
  console.log('token', instance.defaults.headers.common["authorization"])
}

export function clearToken(){
  instance.defaults.headers.common["authorization"] = '';
}

export default instance;