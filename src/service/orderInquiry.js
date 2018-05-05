import api from '../utils/request';
import apiText from '../utils/requestText';


export function getOrderList(params,callback) {
  return api('order/myOrderList', {
    params: JSON.stringify(params)
  },callback);
}


export function getShipment(params,callback) {
  return api('order/shipment', {
    params: JSON.stringify(params)
  },callback);
}
export function getAddress(params,callback) {
  return api('address/selectById', {
    params: JSON.stringify(params)
  },callback);
}

export function confirmAddress(params,callback) {
  return api('order/confirmShipment', {
    params: JSON.stringify(params)
  },callback);
}
export function orderServer(params,callback) {
  return api('order/orderServer', {
    params: JSON.stringify(params)
  },callback);
}

export function getOrder(params,callback) {
  return api('order/orderDetail', {
    params: JSON.stringify(params)
  },callback);
}

export function cancelOrder(params,callback) {
  return api('order/cancelOrder', {
    params: JSON.stringify(params)
  },callback);
}
