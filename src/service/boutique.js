import api from '../utils/request';
import apiText from '../utils/requestText';

export function getBoutique(params,callback,callbackFail) {
  return api('product/indexList', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过
export function getAllBookList(params,callback) {
  return api('product/getAllBookList', {
    params: JSON.stringify(params)
  },callback);
}//用过
export function getCategoryList(params,callback,callbackFail) {
  return api('product/getCategoryList', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过

export function getAllAudioList(params,callback) {
  return api('product/getAllAudioList', {
    params: JSON.stringify(params)
  },callback);
}//用过
export function getAllVideoList(params,callback) {
  return api('product/getAllVideoList', {
    params: JSON.stringify(params)
  },callback);
}//用过
export function getbookInfo(params,callback,callbackFail) {
  return api('product/productInfo', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过
export function getAudioInfo(params,callback,callbackFail) {
  return api('product/productInfo', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过 音乐详情

export function getCartList(params,callback,callbackFail) {
  return api('cart/cartList', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过

export function addCart(params,callback) {
  return api('cart/addCart', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function getPlusNum(params,callback) {
  return api('cart/plusNum', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function getReduceNum(params,callback) {
  return api('cart/reduceNum', {
    params: JSON.stringify(params)
  },callback);
}//用过

export function deleteCartList(params,callback) {
  return api('cart/delete', {
    params: JSON.stringify(params)
  },callback);
}//用过
