import api from '../utils/request';
import apiText from '../utils/requestText';

export function updateGenUserInfo(params,callback) {
  return api('appUser/updateGenUserInfo', {
    params: JSON.stringify(params)
  },callback);
}
export function myInfo(params,callback) {
  return api('appUser/myInfo', {
    params: JSON.stringify(params)
  },callback);
}
export function updateExpUserInfo(params,callback) {
  return api('appUser/updateExpUserInfo', {
    params: JSON.stringify(params)
  },callback);
}
export function updateImg(params,callback) {
  return api('appUser/updateImg', {
    params: JSON.stringify(params)
  },callback);
}
export function selectOptionList(params,callback) {
  return api('common/selectOption', {
    params: JSON.stringify(params)
  },callback);
}
