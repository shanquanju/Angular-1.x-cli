import Mock from 'mockjs';

import homeData from '@/mockData/homeData';

/**
 * Mock 配置
 */
export default () => {
  Mock.mock('mock/homeData', 'post', homeData);
};
