import api from '../utils/request';
import apiText from '../utils/requestText';

export function getWechatPay(params,callback) {
  return api('order/wechatPay', {
    params: JSON.stringify(params)
  },callback);
}

export function getAlipay(params,callback) {
  return api('order/aliPay', {
    params: JSON.stringify(params)
  },callback);
}
