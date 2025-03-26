import { LOCAL_STORAGE_KEY_TOKEN } from '../constants/Common';
import { ROUTES } from '../constants/Routes';
import { getData, removeData } from '../utils/asyncStorage';
import Axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { router } from 'expo-router';


export const AXIOS_INSTANCE = Axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://localhost:8000' });

const rmeoveToken = async () => await removeData(LOCAL_STORAGE_KEY_TOKEN);

AXIOS_INSTANCE.interceptors.request.use(async (config) => {
  const token = await getData(LOCAL_STORAGE_KEY_TOKEN);
  if (token) {
    config.headers = config.headers || ({} as AxiosRequestHeaders);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {

  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)
  .catch((err: AxiosError) => {
    if(err.status === undefined || (err.status >= 500 && err.status < 600))
      {
        console.log('error.generic');
        return;
      }
  
      if (err.response?.status === 401 && err.response?.config?.url != "/api/login") {
        rmeoveToken().then();
        router.replace(ROUTES.PAGE_LOGIN);
      }

      throw err;
  });

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
