import { BaseAxios } from '@/lib';
import { apiPath } from './apiPath';

export const login = (userName: string, password: string) => {
  const axios = new BaseAxios();
  return axios.post(apiPath.admin.auth.login, { userName, password });
};

export const fetchUserInfo = () => {
  const axios = new BaseAxios();
  return axios.get(apiPath.admin.auth.userInfo);
};
