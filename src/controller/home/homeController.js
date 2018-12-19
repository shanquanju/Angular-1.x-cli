import angular from 'angular';

import {
  Inject
} from '@/utils/index';

import '@/assets/theme/default/home/index.scss';

/**
 * Home Controller
 */
@Inject('$scope', 'homeService')
class HomeController {
  constructor($scope, homeService) {
    // 绑定 this
    this.$scope = $scope;
    this.homeService = homeService;
    this.update = this.update.bind(this);
    this.onRenderFinish = this.onRenderFinish.bind(this);

    this.data = {
      content: 'Home Controller',
      time: new Date()
    };
  }

  async update() {
    const result = await this.homeService.getData();
    this.data.content = result.content;
    this.$scope.$apply();
  }

  /**
   * Dom 渲染完成回调
   */
  onRenderFinish() {
    this.update();
  }
}

const app = angular.module('myApp');
app.controller('homeCtrl', HomeController);
