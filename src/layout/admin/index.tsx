'use client';

import { SideBarLayout } from '@/components/layout/SideBar';
import { useAppDispatch, useAppSelector } from '@/lib';
import { setDataUserLogin } from '@/lib/redux/app/userCurrent.slice';
import { CreateHandleFlashMessage } from '@/uiCore/FlashMessage/HandleFlashMessage';
import WrapperNotificationNetWork from '@/uiCore/WrapperNotificationNetWork';
import { fetchUserInfo } from '@/utils/api';
import { handleLogout } from '@/utils/handleLogin';
import { faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userId, userName } = useAppSelector((state) => state.userCurrent);
  const [openUserInfo, setOpenUserInfo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
          dispatch(setDataUserLogin(userInfo?.data));
        }
      }
    }

    fetchData();
  }, []);

  const openOrCloseUserInfo = () => setOpenUserInfo((pre) => !pre);

  return (
    <div className="h-screen overflow-hidden">
      <WrapperNotificationNetWork />
      <CreateHandleFlashMessage />
      <header className="h-14 py-3 bg-white border-b">
        <div className="container h-full flex justify-between">
          <Image alt="logo" src={'/image/logo_1.svg'} height={30} width={100} className="h-full object-contain py-1" />

          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer group">
              <Image alt="user" src={'/image/user.png'} height={30} width={30} className="rounded-full" />
              <FontAwesomeIcon icon={faCaretDown} className="w-2 text-[#303030]" />
            </div>
            <div className="hidden group-hover:block absolute top-full right-0 shadow-md py-3 bg-white w-[200px]">
              <div onClick={openOrCloseUserInfo} className="flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-[#99999961]">
                <span className="text-[#303030]">Thông tin tài khoản</span>
              </div>
              <div className="flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-[#99999961]">
                <span className="text-[#303030]">Đổi mật khẩu</span>
              </div>
              <div onClick={() => handleLogout(dispatch, router)} className="flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-[#99999961]">
                <span className="text-[#303030]">Đăng xuất</span>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </header>
      <main className="h-[calc(100vh-56px)]">
        <div
          onClick={openOrCloseUserInfo}
          className={classNames('fixed top-0 left-0 right-0 bottom-0 bg-[var(--backgroundModal)] items-center justify-center', {
            flex: openUserInfo,
            hidden: !openUserInfo,
          })}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white px-6 py-9 w-fit min-w-[500px] max-w-full rounded-2xl">
            <div className="border-b relative pb-2">
              <h3 className="font-semibold text-lg">Thông tin tài khoản</h3>
              <FontAwesomeIcon onClick={openOrCloseUserInfo} icon={faXmark} className="absolute cursor-pointer top-0 right-0 text-lg" />
            </div>

            <div className="pt-5">
              <div className="flex gap-4 py-2">
                <div className="font-semibold text-base text-[#303030]">Tên tài khoản:</div>
                <span className="text-base font-semibold">{userName}</span>
              </div>

              <div className="flex gap-4 py-2">
                <div className="font-semibold text-base text-[#303030]">Họ và tên:</div>
                <span className="text-base font-semibold">{userName}</span>
              </div>

              <div className="flex gap-4 py-2">
                <div className="font-semibold text-base text-[#303030]">Tên trường:</div>
                <span className="text-base font-semibold">{userName}</span>
              </div>

              <div className="flex gap-4 py-2">
                <div className="font-semibold text-base text-[#303030]">Địa chỉ:</div>
                <span className="text-base font-semibold">{userName}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--backgroundMain)] w-full h-full py-6">
          <div className="container grid grid-cols-7 gap-4 h-full">
            <div className="col-span-1">
              <SideBarLayout />
            </div>
            <div className="col-span-6 rounded-xl bg-white overflow-hidden">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
