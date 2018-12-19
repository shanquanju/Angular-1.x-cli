/**
 * 主页模块路由配置
 */
export default [{
  state: 'home',
  url: '/home',
  templateUrl: 'views/home/home.html',
  controller: ['controller/home/homeController'],
  service: ['service/home/homeService']
}];
