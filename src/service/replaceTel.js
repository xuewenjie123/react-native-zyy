import api from '../utils/request';
import apiText from '../utils/requestText';

export function replaceTel(params,callback) {
  return api('appUser/updateMobile', {
    params: JSON.stringify(params)
  },callback);
}

export function sendMsg(params,callback) {
  return api('appUser/getVerify', {
    params: JSON.stringify(params)
  },callback);
}
export function checkMobile(params,callback) {
  return api('appUser/checkMobile', {
    params: JSON.stringify(params)
  },callback);
}

export function getMobileByUserId(params,callback) {
  return api('appUser/getMobileByUserId', {
    params: JSON.stringify(params)
  },callback);
}
