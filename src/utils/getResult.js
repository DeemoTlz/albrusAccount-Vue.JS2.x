import axios from '@/utils/request';

export function ajaxGet(url) {
  return axios({
    url,
    method: 'GET',
  });
}

export function ajaxPost(url, param) {
  return axios({
    url,
    method: 'POST',
    data: param,
  });
}

export function ajaxLogin(url, param) {
  return axios({
    url,
    method: 'POST',
    data: param,
    transformRequest: [(data) => {
      let ret = '';
      Object.keys(data).forEach((key) => {
        ret += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`;
      });

      return ret.substr(0, ret.lastIndexOf('&'));
    }],
  });
}
