import api from '../utils/request';
import apiText from '../utils/requestText';
export function information(params,callback,callbackFail) {
  return api('archives/information', {
    params: params
  },callback,callbackFail);
}//用过
export function knowledge(params,callback,callbackFail) {
  return api('archives/knowledge', {
    params: params
  },callback,callbackFail);
}//用过
export function goldlist(params,callback,callbackFail) {
  return api('gold/list', {
    params: params
  },callback,callbackFail);
}//用过
export function unitlist(params,callback,callbackFail) {
  return api('unit/list', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过

export function unitDetail(params,callback,callbackFail) {
  return api('unit/queryById', {
    params:params
  },callback,callbackFail);
}//用过
export function focuslist(params,callback,callbackFail) {
  return api('focus/list', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过

export function Governewlist(params,callback,callbackFail){
  return api('archives/affairs', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}
