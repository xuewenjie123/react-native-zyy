import api from '../utils/request';
import apiText from '../utils/requestText';

export function getAllRef(params,callback,callbackFail) {
  return api('product/getAllRef', {
    params: JSON.stringify(params)
  },callback,callbackFail);
}//用过
