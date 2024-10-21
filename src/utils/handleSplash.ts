import { setDataUserLogin } from '@/lib/redux/app/userCurrent.slice';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { fetchUserInfo } from './api';

export const checkAndFetchDataUser = async (dispatch: any, router: AppRouterInstance) => {
  const userInfo = await fetchUserInfo();
  if (userInfo) {
    dispatch(setDataUserLogin(userInfo?.data));
    return setTimeout(() => router.push('/admin'), 3000);
  } else {
    return setTimeout(() => router.push('/auth/login'), 3000);
  }
};
