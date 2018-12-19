import {
  Inject
} from '@/utils/index';

import '@/assets/theme/default.scss';
import '@/assets/theme/default/index/index.scss';

/**
 * Index Controller
 */
@Inject('$scope', '$state')
class IndexController {
  constructor($scope, $state) {
    // 绑定 this
    this.onRenderFinish = this.onRenderFinish.bind(this);

    /**
     * 路由状态改变监听事件
     */
    $scope.$on('$stateChangeStart', function (event, toState) {
      // event.preventDefault();
    });
  }

  /**
   * Dom 渲染完成回调
   */
  onRenderFinish() {
    // TODO:
  }
}

export default IndexController;
