import api from '../utils/request';
import apiText from '../utils/requestText';

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
export function collectList(params,callback) {
  return api('product/collectList', {
    params: JSON.stringify(params)
  },callback);
}
export function collectArchivesList(params,callback) {
  return api('archives/collectList', {
    params: JSON.stringify(params)
  },callback);
}
