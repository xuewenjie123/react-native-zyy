import api from '../utils/request';
import apiText from '../utils/requestText';
export function getPoint(params,callback) {
  return api('appUser/getGenUserBonusPoints', {
    params: JSON.stringify(params)
  },callback);
}
