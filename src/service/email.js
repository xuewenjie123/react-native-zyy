import api from '../utils/request';
import apiText from '../utils/requestText';

export function emailFn(params,callback) {
  return api('appUser/sendEmail', {
    params: JSON.stringify(params)
  },callback);
}
export function getEmailInfo(params,callback) {
  return api('appUser/myInfo', {
    params: JSON.stringify(params)
  },callback);
}
export function unbindEmail(params,callback) {
  return api('appUser/unbindEmail', {
    params: JSON.stringify(params)
  },callback);
}
