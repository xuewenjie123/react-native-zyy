import api from '../utils/request';
import apiText from '../utils/requestText';

export function customerService(params,callback) {
  return api('order/myOrderServerList', {
    params: params
  },callback);
}
