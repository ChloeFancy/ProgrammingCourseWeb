import axios from 'axios';
import router from 'umi/router';
import { stringify } from 'qs';

import { message as Message } from 'antd';
import protoRoot from '../../proto/proto';
import { getAuthority } from '../utils/authority';
import { getCookie } from './cookie';

const httpService = axios.create({
  baseURL: '//http://47.100.89.70:8081',
  timeout: 45000,
  responseType: 'arraybuffer',
  // withCredentials: true,
});

const isArrayBuffer = obj => {
  return Object.prototype.toString.call(obj) === '[object ArrayBuffer]';
};

const transformResponseFactory = responseType => {
  return rawResponse => {
    // 判断response是否是arrayBuffer
    if (rawResponse == null || !isArrayBuffer(rawResponse)) {
      return rawResponse;
    }
    try {
      return protoRoot.lookup(responseType).decode(new Uint8Array(rawResponse));
    } catch (err) {
      throw err;
    }
  };
};

/**
 *
 * @param url
 * @param {*} data post请求体参数(get参数不用编码)
 * @param {*} reqProto 请求参数协议
 * @param {*} resProto 返回值协议
 * @param {*} method 方法
 */
const request = ({ url, data = null, reqProto, resProto, method = 'post', auth, config = {} }) => {
  // 这里用到axios的配置项：transformRequest和transformResponse
  // transformRequest 发起请求时，调用transformRequest方法，目的是将req转换成二进制
  // transformResponse 对返回的数据进行处理，目的是将二进制转换成真正的json数据
  const role = getAuthority();
  if (Array.isArray(auth) && !auth.includes(role)) {
    Message.warning('无接口权限');
    return false;
  }
  try {
    const requestBody = reqProto && data ? createReqMsg(reqProto, data) : data;
    console.log(`请求url: ${url}, 请求参数协议: ${reqProto}, data: `, data, '编码后: ', requestBody);
    const requestConfig = {
      ...config,
      withCredentials: true,
      transformResponse: transformResponseFactory(resProto),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/octet-stream',
      },
      params: {
        token: getCookie('token'),
        // 没有解决跨域cookie的问题，以上为暂时方案
      }
    };
    const promise = method === 'post' ? httpService
    .post(url, requestBody, requestConfig) : httpService
    .get(url, requestConfig);
    return promise
      .then(
        ({ data, status }) => {
          // 对请求做处理
          if (data.status && data.status.code === 4) {
            Message.error('身份过期，请重新登录', 1.5, () => {
              router.push({
                pathname: '/user/login',
                search: stringify({
                  redirect: window.location.href,
                }),
              });
            });
          }
          console.log(`返回结果: `, { data, status });
          return data;
        },
        err => {
          throw err;
        }
      );
  } catch (e) {
    throw e;
  }

};

// 在request下添加一个方法，方便用于处理请求参数
const createReqMsg = (protoName, obj) => {
  const encoded = protoRoot
    .lookup(protoName)
    .encode(obj)
    .finish();
  return encoded.buffer.slice(encoded.byteOffset, encoded.byteOffset + encoded.byteLength);
};

export default request;
