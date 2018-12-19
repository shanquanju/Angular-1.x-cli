import languageModules from '@/i18n/index';

import {
  importFile,
  getCookie,
  setCookie
} from '@/utils/index';

import {
  COOKIE_KEY,
  BASIC_CONFIG
} from '@/basicData/index';

/**
 * 多语言配置
 */
export default async () => {
  // 获取当前语言
  let LANGUAGE_TOKEN = getCookie(COOKIE_KEY.LANGUAGE);
  if (!LANGUAGE_TOKEN) {
    LANGUAGE_TOKEN = 'zh-cn';
    setCookie(COOKIE_KEY.LANGUAGE, LANGUAGE_TOKEN, BASIC_CONFIG.EXPIRES_DAY);
  }

  // 加载语言包
  const config = {};
  for (let index = 0; index < languageModules.length; index++) {
    const element = languageModules[index];
    config[element] = await importFile(`i18n/${LANGUAGE_TOKEN}/${element}.js`);
  }

  return config;
};
