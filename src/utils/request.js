import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : '',
  timeout: 20000,
});

service.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

export default service;
