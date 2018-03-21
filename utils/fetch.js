import { API_ROOT } from '../config'
const fetch = (options) => {
	if (typeof options === 'string'){
		options = {
			endpoint: options
		}
	}
	const defaultOptions = {
		endpoint,
		method: 'GET',
		data,
		header,
		dataType: 'application/json',
	}
	const config = Object.assign({}, defaultOptions, options)
	const {
		endpoint,
		method,
		data,
		header,
		dataType,
	} = config
	const results = new Promise(function(resolve, reject){
    wx.showLoading({
      title: '加载中',
    })
		wx.request({
      url: `${API_ROOT}${endpoint}`,
			method,
			data,
			header,
			dataType,
			success: (res) => {
            wx.hideLoading()
            if (res.statusCode === 200) {
              if (dataType.indexOf('json') > 0) {
                resolve(JSON.parse(res.data));
              }
		        } else {
              reject(res.statusCode)
            }
			}
		})
	})
	return results
}
module.exports = {
	fetch: fetch
}