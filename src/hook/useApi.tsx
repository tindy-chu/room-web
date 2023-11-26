import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { useState } from 'react';
import { ParseParams } from 'zod';
import { useGlobalSpinnerStore } from '../components/globalSpinner';
import system from '../utils/system';

axios.defaults.paramsSerializer = {
  ...axios.defaults.paramsSerializer,
  serialize: (params) =>
    qs.stringify(params, {
      arrayFormat: 'repeat',
      strictNullHandling: true,
      skipNulls: true,
    }),
};
axios.defaults.headers.head['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  async (config) => {
    // config.headers['Access-Control-Allow-Origin'] = '*';
    // for (const key in config.params) {
    //   if (config.params[key] === '') {
    //     delete config.params[key];
    //   }
    // }
    // console.log(`*****START 1af0ba ${Math.random().toString(32)} config*****\n`,
    //   JSON.stringify(config),
    //   '\n***** END ****'
    // );
    return config;
  },
  async (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);

type TUseApiOptionsPrams<T> = {
  withToken?: boolean;
  delayMs?: number;
  mockData?: object | T;
  isGlobalLoading?: boolean;
  config?: AxiosRequestConfig<object>;
  parse?: (data: unknown, params?: Partial<ParseParams>) => T;
};

export type TUseApi<T> = {
  request: (options?: { params?: any; payload?: any }) => Promise<void>;
  response: AxiosResponse<T, unknown> | null;
  loading: boolean;
  error: unknown;
};

const useApi = <T,>(
  method: 'post' | 'get' | 'put' | 'delete',
  url: string,
  options: TUseApiOptionsPrams<T> = {}
): TUseApi<T> => {
  const config = options.config || {};

  if (options.withToken) {
    const accessToken = localStorage.getItem('accessToken');
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  const globalSpinnerStore = useGlobalSpinnerStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse<T, unknown> | null>(
    null
  );
  const [error, setError] = useState<unknown>(null);

  let deleteGlobalSpinnerId = () => {};

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);

    if (!options.isGlobalLoading) {
      return;
    }

    if (isLoading) {
      deleteGlobalSpinnerId = globalSpinnerStore.addId();
    } else {
      deleteGlobalSpinnerId();
    }
  };

  const request: TUseApi<T>['request'] = async ({ params, payload } = {}) => {
    handleLoading(true);
    if (params) {
      config.params = params;
    }

    let tmpResponse: TUseApi<T>['response'] = null;
    try {
      if (method === 'get' || method === 'delete') {
        tmpResponse = await axios[method]<T>(url, {
          params: payload,
          ...config,
        });
      }

      if (method === 'post' || method === 'put') {
        tmpResponse = await axios[method]<T>(url, payload, config);
      }

      if (options.parse && tmpResponse) {
        tmpResponse.data = options.parse(tmpResponse.data);
      }
      console.log(
        `*****START d434d4 ${Math.random().toString(32)} tmpResponse*****\n`,
        JSON.stringify(tmpResponse),
        '\n***** END ****'
      );
      setResponse(tmpResponse);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        system.popupError(e.response?.data.error?.message);
        setError(e);
        return;
      }
      system.popupError(JSON.stringify(e));
    } finally {
      handleLoading(false);
    }
  };

  return { loading, request, response, error };
};

export default useApi;
