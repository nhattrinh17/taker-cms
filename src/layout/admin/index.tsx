'use client';

import { useAppDispatch, useAppSelector } from '@/lib';
import { handleLogout } from '@/utils/handleLogin';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userCurrent);

  useEffect(() => {
    if (!userId) {
      router.replace('/');
    }
  }, []);

  return (
    <>
      <header className="h-14 py-3 bg-white border-b">
        <div className="container h-full flex justify-between">
          <Image alt="logo" src={'/image/logo_1.svg'} height={30} width={100} className="h-full object-contain py-1" />

          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer group">
              <Image alt="user" src={'/image/user.png'} height={30} width={30} className="rounded-full" />
              <FontAwesomeIcon icon={faCaretDown} className="w-2 text-[#303030]" />
            </div>
            <div className="hidden group-hover:block absolute top-full right-0 shadow-md py-3 bg-white w-[200px]">
              <div className="flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-[#99999961]">
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
      <main className="container py-6">{children}</main>
    </>
  );
}
