import api from '../utils/request';
import apiText from '../utils/requestText';

export function information(params,callback,callbackFail) {
  return api('famous/list', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过
export function knowledge(params,callback) {
  return api('archives/knowledge', {
    params: params
  },callback);
}//用过
export function selectById(params,callback) {
  return api('famous/queryById', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function getLiterature(params,callback) {
  return api('literature/list', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function getLecture(params,callback) {
  return api('lecture/list',{
    params: JSON.stringify(params)
  },callback);
}//用过

export function getSection(params,callback,callbackFail){
  return api('common/selectOption',{
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过

export function reserve(params,callback){
  return api('lecture/reserve',{
    params: JSON.stringify(params)
  },callback);
}//用过
