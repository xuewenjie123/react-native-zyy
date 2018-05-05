import api from '../utils/request';
import apiText from '../utils/requestText';

export function getQuestion(params,callback,callbackFail) {
  return api('question/my/list', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过
export function setQuestion(params,callback) {
  return api('question/add', {
    params: JSON.stringify(params)
  },callback);
}//用过
export function getQueDetail(params,callback,callbackFail) {
  return api('question/detail', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过
export function getListQuestion(params,callback,callbackFail) {
  return api('question/list', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过

export function setReply(params,callback,callbackFail) {
  return api('question/answer', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过
export function addLaud(params,callback) {
  return api('question/laud/add', {
    params: JSON.stringify(params)
  },callback);
}
export function removeLaud(params,callback) {
  return api('question/laud/remove', {
    params: JSON.stringify(params)
  },callback);
}
