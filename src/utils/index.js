import {
	ElLoading
} from 'element-plus'
import {
	ElMessage
} from 'element-plus'
/**
 * 工具方法的定义
 */
const utils = {
	//加载动画
	loadding: null,
	/**
	 * 展示加载动画
	 * @param {Object} msg 加载动画文本提示
	 */
	showLoadding(msg) {
		utils.loading = ElLoading.service({
			lock: true,
			text: msg ? msg : '加载中...'
		})
	},
	/**
	 * 隐藏加载动画
	 */
	hideLoadding() {
		utils.loading && utils.loading.close();
	},

	//消息提示
	/**
	 * 关闭所有消息提示
	 */
	closeMsg() {
		ElMessage.closeAll()
	},
	/**
	 * 展示异常的消息提示
	 * @param {Object} msg 提示的消息内容
	 */
	showError(msg) {
		return ElMessage({
			message: msg,
			grouping: true,
			type: 'error',
		})
	},
	/**
	 * 展示成功的消息提示
	 * @param {Object} msg 提示的消息内容
	 */
	showSucess(msg) {
		return ElMessage({
			message: msg,
			grouping: true,
			type: 'success',
		})
	},
	/**
	 * 展示警告的消息提示
	 * @param {Object} msg 提示的消息内容
	 */
	showWarning(msg) {
		return ElMessage({
			message: msg,
			grouping: true,
			type: 'warning',
		})
	},
	/**
	 * 展示提示的消息提示
	 * @param {Object} msg 提示的消息内容
	 */
	showDefault(msg) {
		return ElMessage({
			message: msg,
			grouping: true,
			type: 'info'
		})
	}
};
export default utils;