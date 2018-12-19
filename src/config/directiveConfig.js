import NgRenderFinish from '@/directive/ngRenderFinish';

/**
 * Directive 注册
 * @param {Object} app Angular 实例对象
 */
export default (app) => {
  app.directive('ngRenderFinish', NgRenderFinish);
};
