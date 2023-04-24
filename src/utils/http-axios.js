/**
 * 网络请求配置
 */
import axios from 'axios'
// import { getCookie } from '@/utils/cookie';

import { message } from 'antd'

axios.defaults.timeout = 100000
axios.defaults.baseURL = '/'

// const [messageApi, ] = message.useMessage()
let hide = null
/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  config => {
    // console.log('[ getCookie("authToken") ] >', getCookie("authToken"))
    const { method, data, url } = config
    // config.data = JSON.stringify(data)
    config.data = data
    // console.log('[ config ] >', config)
    hide =
      ['list', 'tree'].find(v => url.includes(v)) || method === 'get'
        ? () => {}
        : message.loading('正在处理...', 0)

    const hasUrl = config.url.indexOf('spare/upload') !== -1
    // console.log('[ config.data ] >', hasUrl, config.url)

    config.headers = {
      'Content-Type': hasUrl ? 'multipart/form-data' : 'application/json',
      'auth-token': localStorage.getItem('authToken') // getCookie("authToken")
    }
    return config
  },
  error => {
    hide && hide()
    return Promise.reject(error)
  }
)

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  response => {
    console.log('[ response ] >', response)
    hide && hide()
    if (response?.status === 203) {
      console.log('过期')
      window.location.href = '/login'
    }
    return response
  },
  error => {
    hide && hide()
    msag(error)
    console.log('请求出错：', error)
  }
)

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(response => {
        // landing(url, params, response.data);
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        //关闭进度条
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data, options).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deleteFetch (url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data, options).then(
      response => {
        resolve(response?.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

//统一接口处理，返回数据
export default function fetch (fecthP, url, param, options) {
  console.log('[ params ] >', param)
  return new Promise((resolve, reject) => {
    const fetchLow = fecthP.toLowerCase()
    switch (fetchLow) {
      case 'get':
        console.log('begin a get request,and url:', url)
        get(url, param)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            console.log('get request GET failed.', error)
            reject(error)
          })
        break
      case 'post':
        post(url, param)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            console.log('get request POST failed.', error)
            reject(error)
          })
        break
      case 'put':
        put(url, param, options)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            console.log('get request PUT failed.', error)
            reject(error)
          })
        break
      case 'delete':
        deleteFetch(url, param, options)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            console.log('get request PUT failed.', error)
            reject(error)
          })
        break
      default:
        break
    }
  })
}

//失败提示
function msag (err) {
  const errMap = {
    400: err.message,
    401: '未授权，请登录',
    403: '拒绝访问',
    404: '请求地址出错',
    408: '请求超时',
    500: '服务器内部错误',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持'
  }
  if (err && err.response) {
    message.error(errMap[err.response.status], 1)
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
// function landing(url, params, data) {
//     if (data.code === -1) {
//     }
// }
