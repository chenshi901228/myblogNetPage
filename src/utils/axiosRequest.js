import axios from 'axios'

import {
    baseUrl
} from '../config/globconf'


/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：get、post
 * @param {Object} [params={}] body的请求参数，默认为空
 * @return 返回Promise
 */

const http = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
})

// 请求拦截
http.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截
http.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data
    } else {
        return res
    }
}, err => {
    Promise.reject(err)
})


export function Request(url, method, params = {}) {
    if (JSON.stringify(params) !== "{}") {
        params = JSON.stringify(params)
        return new Promise((resolve, reject) => {
            http[method](baseUrl + url, params)
                .then(res => {
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })
        })
    } else {
        return new Promise((resolve, reject) => {
            http[method](baseUrl + url)
                .then(res => {
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}