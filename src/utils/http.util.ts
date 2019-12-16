import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

import Logger from "./logger.util";

const instance = axios.create();
const CancelToken = axios.CancelToken;
/**
 * Instance of axio, to remove the request interceptor if needed anytime.
 */
const HttpRequestInterceptor = instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    Logger().add({
      requestUrl: config.url,
      method: config.method
    });
    return config;
  }
);
/**
 * Instance of axio, to remove the response interceptor if needed anytime.
 */
const HttpResponseInterceptor = instance.interceptors.response.use(
  (config: AxiosResponse) => {
    Logger().add({
      headers: config.headers
    });
    return config;
  },
  (err: AxiosError) => {
    Logger().add({
      ...err
    });
    return Promise.reject({
      message: err.message
    });
  }
);

/**
 * Class to make http calls and contain interceptor config also.
 */
export default class AxiosHttp {
  /**
   * Function to remove the request interceptor, if needed anytime.
   */
  static removeRequestInterceptor = () => {
    instance.interceptors.request.eject(HttpRequestInterceptor);
  };

  /**
   * Function to remove the response interceptor, if needed anytime.
   */
  static removeResponseInterceptor = () => {
    instance.interceptors.response.eject(HttpResponseInterceptor);
  };

  request = (
    config: AxiosRequestConfig,
    resolve: Function,
    reject: Function
  ): any => {
    let cancelToken;
    instance({
      ...config,
      cancelToken: new CancelToken(c => {
        cancelToken = c;
      })
    })
      .then((data: any) => {
        Logger().add({
          requestUrl: config.url,
          method: config.method
        });
        resolve(data);
      })
      .catch((err: any) => {
        Logger().add({ ...err });
        reject(err);
      });
    return cancelToken;
  };
}
