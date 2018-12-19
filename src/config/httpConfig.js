import axios from 'axios';

/**
 * axios 配置
 */
export default () => {
  // 创建实例
  const instance = axios.create();

  // 超时默认值
  instance.defaults.timeout = 20 * 1000;

  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    switch (response.status) {
      case 200:
        return response.data || {};
      default:
        return Promise.reject(response.statusText || 'Request error');
    }
  }, function (error) {
    return Promise.reject(error);
  });

  return instance;
};
