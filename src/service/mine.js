import api from '../utils/request';
import apiText from '../utils/requestText';

export function getUserInfo(params,callback) {
  return api('login/login', {
    params: JSON.stringify(params)
  },callback);
}
export function myInfo(params,callback) {
  return api('appUser/myInfo', {
    params: JSON.stringify(params)
  },callback);
}
