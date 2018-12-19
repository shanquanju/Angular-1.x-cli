import homeRouter from '@/router/home';

const defaultRouter = {
  state: 'default',
  url: '',
  templateUrl: 'views/home/home.html',
  controller: ['controller/home/homeController'],
  service: ['service/home/homeService']
};

/**
 * 路由配置
 */
export default [
  defaultRouter,
  ...homeRouter
];
