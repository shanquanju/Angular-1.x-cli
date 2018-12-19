import timeFormat from '@/filter/timeFormat';

/**
 * Filter 注册
 * @param {Object} app Angular 实例对象
 */
export default (app) => {
  app.filter('timeFormat', timeFormat);
};
