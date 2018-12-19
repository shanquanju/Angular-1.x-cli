import {
  Inject
} from '@/utils/index';

/**
 * Dom 渲染完成回调 Directive
 */
@Inject('$timeout')
class NgRenderFinish {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.restrict = 'A';
  }

  link(scope, element, attributes) {
    this.$timeout(() => {
      scope.$eval(attributes['ngRenderFinish'], {});
    }, 300);
  }
}

export default NgRenderFinish;
