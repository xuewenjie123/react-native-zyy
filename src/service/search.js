import api from '../utils/request';
import apiText from '../utils/requestText';

//搜索新闻
export function getArchivesList(params,callback) {
  return api('search/getArchivesList', {
    params: JSON.stringify(params)
  },callback);
}//用过


//搜索名家
export function getFamousList(params,callback) {
  return api('search/getFamousList', {
    params: JSON.stringify(params)
  },callback);
}//用过


//搜索精品
export function getProductList(params,callback) {
  return api('search/getProductList', {
    params: JSON.stringify(params)
  },callback);
}//用过
export function searchRecords(params,callback) {
  return api('search/searchRecords', {
    params: JSON.stringify(params)
  },callback);
}
export function deleteRecords(params,callback) {
  return api('search/deleteRecords', {
    params: JSON.stringify(params)
  },callback);
}
