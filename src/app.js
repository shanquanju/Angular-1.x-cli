import angular from 'angular';
import uiRouter from 'angular-ui-router';

import appConfig from '@/config/appConfig';
import directiveConfig from '@/config/directiveConfig';
import filterConfig from '@/config/filterConfig';
import httpConfig from '@/config/httpConfig';
import IndexController from '@/controller/index';
import mockConfig from '@/config/mockConfig';

const dependency = [
  uiRouter
];

const app = angular.module('myApp', dependency);

// 注册 HttpService
httpConfig();

// 注册 Mock 模拟
mockConfig();

// 注册 Controller
app.controller('indexCtrl', IndexController);

// 注册 Directive
directiveConfig(app);

// 注册 Directive
filterConfig(app);

// App 配置
appConfig(app);

// 启动 APP
angular.element(document).ready(function () {
  angular.bootstrap(window.document, [app.name]);
});

/**
 * 窗口大小改变监听事件
 */
window.onresize = function () {
  window.location.reload();
};

/**
 * Angular 实例
 */
export default app;
