import api from '../utils/request';
import apiText from '../utils/requestText';

export function queryAddress(params,callback,callbackFail) {
  return api('address/list', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过

export function addAddress(params,callback) {
  return api('address/addAddress', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function editAddress(params,callback) {
  return api('address/updateAddress', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function selectAddress(params,callback) {
  return api('address/selectById', {
    params: JSON.stringify(params)
  },callback);
}//用过


export function deleteAddress(params,callback) {
  return api('address/deleteAddress', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function setDefaultFunc(params,callback) {
  return api('address/setDefault', {
    params: JSON.stringify(params)
  },callback);
}//用过
