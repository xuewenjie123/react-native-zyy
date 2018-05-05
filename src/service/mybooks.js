import api from '../utils/request';
import apiText from '../utils/requestText';

export function myShelf(params,callback) {
  return api('order/myShelf', {
    params: JSON.stringify(params)
  },callback);
}
