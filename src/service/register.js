import api from '../utils/request';
import apiText from '../utils/requestText';

export function registerGeneral(params,callback) {
  return api('appUser/generalRegister', {
    params: JSON.stringify(params)
  },callback);
}
export function registerExpert(params,callback) {
  return api('appUser/famousRegister', {
    params: JSON.stringify(params)
  },callback);
}

export function sendMsg(params,callback) {
  return api('appUser/getVerify', {
    params: JSON.stringify(params)
  },callback);
}
