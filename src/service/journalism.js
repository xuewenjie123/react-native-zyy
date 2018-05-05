import api from '../utils/request';
import apiText from '../utils/requestText';

export function selectById(params,callback) {
  return api('archives/selectById', {
    params: JSON.stringify(params)
  },callback);
}

export function getLiterature(params,callback) {
  return api('literature/list', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function getLecture(params,callback) {
  return api('lecture/list', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function list(params,callback) {
  return api('channel/list', {
    params: params
  },callback);
}//用过
export function archives(params,callback) {
  return api('archives/list', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function addViewNum(params,callback) {
  return api('channel/addViewNum', {
    params: params
  },callback);
}
export function getMenu(params,callback) {
  return apiText('captcha', {
    params: JSON.stringify(params)
  },callback);
}
export function collect(params,callback) {
  return api('collect/add', {
    params: JSON.stringify(params)
  },callback);
}
export function removeCollect(params,callback) {
  return api('collect/remove', {
    params: JSON.stringify(params)
  },callback);
}
export function addLike(params,callback) {
  return api('archives/like/add', {
    params: JSON.stringify(params)
  },callback);
}
export function removeLike(params,callback) {
  return api('archives/like/remove', {
    params: JSON.stringify(params)
  },callback);
}
