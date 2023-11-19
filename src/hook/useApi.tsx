import axios from 'axios';
import qs from 'qs';

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

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
};
export default http;
