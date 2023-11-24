import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { useState } from 'react';
import { ParseParams } from 'zod';
import { useGlobalSpinnerStore } from '../components/globalSpinner';
import system from '../utils/system';
// import { useState } from 'react';
// import { ParseParams } from 'zod';

axios.defaults.paramsSerializer = {
  ...axios.defaults.paramsSerializer,
  serialize: (params) =>
    qs.stringify(params, {
      arrayFormat: 'repeat',
      strictNullHandling: true,
      skipNulls: true,
    }),
};
axios.defaults.headers.head['Content-Type'] =
  'application/x-www-form-urlencoded';

axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Content-Type'] =
        config.headers['Content-Type'] || 'application/json';
      config.headers['Authorization'] = 'Bearer ' + accessToken;
      config.headers['Access-Control-Allow-Origin'] = '*';
    } else {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    for (const key in config.params) {
      if (config.params[key] === '') {
        delete config.params[key];
      }
    }

    return config;
  },
  async (err) => {
    console.error(err);
    // TODO promote error
    return Promise.reject(err);
  }
);

type TUseApiPrams<T> = {
  method: 'post' | 'get' | 'put' | 'delete';
  url: string;
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

const useApi = <T,>({
  method,
  url,
  isGlobalLoading,
  config = {},
  parse,
}: TUseApiPrams<T>): TUseApi<T> => {
  const globalSpinnerStore = useGlobalSpinnerStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse<T, unknown> | null>(
    null
  );
  const [error, setError] = useState<unknown>(null);

  let deleteGlobalSpinnerId = () => {};

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);

    if (!isGlobalLoading) {
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

      if (parse && tmpResponse) {
        tmpResponse.data = parse(tmpResponse.data);
      }

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
