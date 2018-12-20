import languageConfig from '@/config/languageConfig';
import routerConfig from '@/config/routerConfig';
import lazyLoad from '@/utils/lazyLoad/index';
import {importFile} from '@/utils/index';

/**
 * App 配置
 * @param {Object} app Angular 实例对象
 */
export default (app) => {
  app.config(['$stateProvider', '$controllerProvider', '$compileProvider', '$provide', '$filterProvider', '$urlRouterProvider',
    function ($stateProvider, $controllerProvider, $compileProvider, $provide, $filterProvider, $urlRouterProvider) {
      // 替换为 Angular 内部注册方法
      app.controller = $controllerProvider.register;
      app.directive = $compileProvider.directive;
      app.factory = $provide.factory;
      app.filter = $filterProvider.register;
      app.service = $provide.service;

      // 路由注册
      for (let index = 0; index < routerConfig.length; index++) {
        const element = routerConfig[index];
        $stateProvider.state(
          element.state, {
            url: element.url,
            template: importFile(element.templateUrl),
            params: element.params || {},
            resolve: {
              deps: lazyLoad(element)
            }
          }
        );
      }

      // 404 路由注册
      $stateProvider.state(
        '404', {
          url: '404',
          template: importFile('views/error/404.html')
        }
      );

      // 路由校验
      $urlRouterProvider.otherwise(($injector) => {
        $injector.invoke(['$state', ($state) => {
          $state.go('404', {}, {
            location: false
          });
        }]);
      });

      languageConfig().then((result) => {
        $provide.value('$lang', result);
      });
    }
  ]);
};
