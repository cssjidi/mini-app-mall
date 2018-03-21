import { observable, action, map, transaction, ObservableMap, computed, extendObservable } from '../libs/mobx.min.js'
import filter from '../utils/filter.js'
import { API_ROOT } from '../config.js'
class FetchStore {
  MIME = {
    NONE: '',
    JSON: 'application/json;charset=UTF-8',
    TEXT: 'text/plain',
  }
  constructor() {
    extendObservable(this, {
      blockedRequest: observable,
      start: action(({
        method,
        endpoint,
        contentType = this.MIME.JSON,
        accept = this.MIME.JSON,
        data,
        schema,
        successAction,
        header,
        errorAction,
        msgReq,
        msgSuccess,
        msgError,
        ...rest
    }) => {
        const fullUrl = endpoint.indexOf(API_ROOT) === -1 ?
          API_ROOT + endpoint : endpoint
        const headers = {
          'Content-Type': contentType,
          Accept: accept,
        }
        if (!contentType) {
          delete headers['Content-Type']
        }
        if(msgReq){
          wx.showLoading({
            title: msgReq,
          })
        }
        wx.request({
          url: fullUrl,
          method,
          data: contentType && contentType === this.MIME.JSON ? JSON.stringify(data) : data,
          header,
          contentType,
          success: (res) => {
            if (res.statusCode === 200) {
              msgReq && wx.hideLoading()
              if (contentType.indexOf('json') > 0) {
                return successAction(res.data)
              }
            } else {
              wx.showToast({
                title: '加载失败',
                image: '../../images/popup-close.png'
              })
              //return errorAction(res.statusCode)
            }
          },
          ...rest,
        })
      })
    })
  }
}

export default FetchStore