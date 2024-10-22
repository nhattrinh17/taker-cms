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

export const getAllVoucher = (search: string, page: number, limit: number) => {
  const axios = new BaseAxios();
  let url = `${apiPath.admin.voucher.getAll}?page=${page}&limit=${limit}`;
  if (search) {
    url += `?search=${search}`;
  }
  return axios.get(url);
};

export const createVoucher = (voucherData: any) => {
  const axios = new BaseAxios();
  return axios.post(apiPath.admin.voucher.create, voucherData);
};
