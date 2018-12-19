/**
 * 加载文件
 * @param {string} filePath 文件相对路径
 */
export const importFile = async (filePath) => {
  const result = await import(`@/${filePath}`);
  return result.default;
};

/**
 * 依赖注册辅助方法
 * @param  {...any} dependencies 依赖
 */
export const Inject = (...dependencies) => (target) => {
  // 获取当前 class 的父类
  const parentClass = Object.getPrototypeOf(target);

  const parentDependencies = parentClass.$inject;

  if (parentDependencies && toString.call(parentDependencies) === '[object Array]') {
    dependencies = [...dependencies, ...parentDependencies];
  }

  target.$inject = dependencies;
};

/**
 * 设置 Cookie
 * @param {String} name Cookie 名称
 * @param {String} value Cookie 值
 * @param {Number} exdays Cookie 过期时间
 */
export const setCookie = (name, value, exdays) => {
  const dateNow = new Date();
  dateNow.setTime(dateNow.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + dateNow.toGMTString();
  document.cookie = name + '=' + value + '; ' + expires;
};

/**
 * 获取 Cookie
 * @param {String} name Cookie 名称
 */
export const getCookie = (name) => {
  const regExp = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  const regExpMatchList = document.cookie.match(regExp);
  if (regExpMatchList) {
    return (regExpMatchList[2]);
  }

  return null;
};

/**
 * 删除 Cookie
 * @param {String} name Cookie 名称
 */
export const delCookie = (name) => {
  const dateNow = new Date();
  dateNow.setTime(dateNow.getTime() - 1);
  const currentCookie = getCookie(name);
  if (currentCookie != null) {
    document.cookie = name + '=' + currentCookie + ';expires=' + dateNow.toGMTString();
  }
};
