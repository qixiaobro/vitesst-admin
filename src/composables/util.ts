/**
 * 获取localStorage
 * @param key Storage名称
 * @returns {String}
 */
export function localGet(key: string) {
	const value = window.localStorage.getItem(key);
	try {
		return JSON.parse(window.localStorage.getItem(key) as string);
	} catch (error) {
		return value;
	}
}

/**
 * 存储localStorage
 * @param key Storage名称
 * @param value Storage值
 */
export function localSet(key: string, value: any) {
	window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 清除localStorage
 * @param key Storage名称
 */
export function localRemove(key: string) {
	window.localStorage.removeItem(key);
}

/**
 * 清除所有localStorage
 * @returns {String}
 */
export function localClear() {
	window.localStorage.clear();
}

/**
 * 对象深克隆
 * @param obj 源对象
 * @returns {obj} 克隆后的对象
 */
export function deepCopy<T>(obj: any): T {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === "object") {
			newObj[attr] = deepCopy(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}

/**
 * 递归查询当前路由所对应的tabPane
 * @param res 当前地址匹配的路由对象
 */
export function getTabPane<T, U>(menuList: any[], path: U): T {
	let result: any;
	for (let item of menuList || []) {
		if (item.path === path) result = item;
		const res = getTabPane(item.children, path);
		if (res) result = res;
	}
	return result;
}
