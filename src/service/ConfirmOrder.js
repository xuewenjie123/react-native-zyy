import api from '../utils/request';
import apiText from '../utils/requestText';

export function selectDefault(params,callback) {
  return api('address/selectDefault', {
    params: JSON.stringify(params)
  },callback);
}

export function addOrder(params,callback) {
  return api('order/addOrder', {
    params: JSON.stringify(params)
  },callback);
}
