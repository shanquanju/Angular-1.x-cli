// moment 不支持 ES6 import
const moment = require('moment');

/**
 * 时间格式化过滤器
 */
export default () => {
  return (input) => {
    return moment(input).format('YYYY-MM-DD HH:mm:ss');
  };
};
