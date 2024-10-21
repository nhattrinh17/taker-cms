import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { fetchUserInfo, login } from './api';
import { setDataUserLogin } from '@/lib/redux/app/userCurrent.slice';
import { resetDataUser } from '@/lib/redux/app/users.slice';

export const handleLogin = async (userName: string, password: string, router: AppRouterInstance, dispatch: any) => {
  const res = await login(userName, password);
  if (res?.type == 'success') {
    const { token } = res?.data;
    localStorage.setItem('access_token', token);

    const userInfo = await fetchUserInfo();
    if (userInfo?.type == 'success') {
      dispatch(setDataUserLogin(userInfo?.data));
      return router.push('/admin');
    }
  }
  return true;
};

export const handleLogout = (dispatch: any, router: AppRouterInstance) => {
  dispatch(resetDataUser());
  localStorage.removeItem('access_token');
  router.replace('/auth/login');
};
