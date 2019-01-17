import axios from 'axios'

import { baseUrl } from '../config/globconf'


/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：get、post
 * @param {Object} [params={}] body的请求参数，默认为空
 * @return 返回Promise
 */

export function Request(url, method, params = {}) {

    if (method === "post") {
        return new Promise((resolve, reject) => {
            axios.post(baseUrl + url, params)
                .then(res => { resolve(res) })
                .catch(error => { reject(error) })
        })
    } else {
        return new Promise((resolve, reject) => {
            axios.get(baseUrl + url, params)
                .then(res => { resolve(res) })
                .catch(error => { reject(error) })
        })
    }
}