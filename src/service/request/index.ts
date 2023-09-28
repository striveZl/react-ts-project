import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { HYRequestConfig } from './type';

//HYRequestConfig,HYInterceptors
class HYRequest {
  instance: AxiosInstance;
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);

    //拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        return err;
      }
    );
    //  对特定的hyRequest实例添加拦截器InternalAxiosRequestConfig
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  // 封装网络请求的方法
  //T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    if (config.interceptors?.requestFailureFn) {
      config = config.interceptors.requestFailureFn(config);
    }
    // 返回promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' });
  }
  psot<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DElETE' });
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' });
  }
}
export default HYRequest;
