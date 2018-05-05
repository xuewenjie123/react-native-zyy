import api from '../utils/request';
import apiText from '../utils/requestText';


export function login(params,callback) {
  return api('appUser/login', {
    params: JSON.stringify(params)
  },callback);
}

export function forgetPassWord(params,callback) {
  return api('appUser/confirmInfo ', {
    params: JSON.stringify(params)
  },callback);
}


export function confirmMobile(params,callback) {
  return api('appUser/confirmMobile ', {
    params: JSON.stringify(params)
  },callback);
}
