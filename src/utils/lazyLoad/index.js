import {
  lazyLoad
} from '@/utils/lazyLoad/helper';

/**
 * 懒加载辅助方法
 * @param {Object} params 路由配置对象
 */
export default (params) => {
  return ['$q', '$rootScope', function ($q, $rootScope) {
    const deferred = $q.defer();

    lazyLoad(params).then(() => {
      $rootScope.$apply(function () {
        deferred.resolve();
      });
    });

    return deferred.promise;
  }];
};
