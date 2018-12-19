import path from 'path';

import {
  importFile
} from '@/utils/index';

/**
 * 懒加载文件
 * @param {string} filePath 文件路径
 */
const importHelper = async (filePath) => {
  const extension = path.extname(filePath);
  switch (extension) {
    case '':
      await importFile(`${filePath}.js`);
      break;
    default:
      await importFile(`${filePath}`);
      break;
  }
};

/**
 * 懒加载辅助方法
 * @param {Object} params 路由配置对象
 */
export const lazyLoad = async (params) => {
  let dependency = [];
  if (params.service) {
    if (Array.isArray(params.service)) {
      dependency = [
        ...dependency,
        ...params.service
      ];
    } else {
      dependency.push(params.service);
    }
  }

  if (params.controller) {
    if (Array.isArray(params.controller)) {
      dependency = [
        ...dependency,
        ...params.controller
      ];
    } else {
      dependency.push(params.controller);
    }
  }

  for (let index = 0; index < dependency.length; index++) {
    const element = dependency[index];
    await importHelper(element);
  }
};
