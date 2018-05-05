import api from '../utils/request';
import apiText from '../utils/requestText';

export function editPassWord(params,callback) {
  return api('appUser/updatePassword', {
    params: JSON.stringify(params)
  },callback);
}


export function checkOldPassword(params,callback) {
  return api('appUser/checkOldPassword', {
    params: JSON.stringify(params)
  },callback);
}


export function resetPassword(params,callback) {
  return api('appUser/resetPassword', {
    params: JSON.stringify(params)
  },callback);
}
