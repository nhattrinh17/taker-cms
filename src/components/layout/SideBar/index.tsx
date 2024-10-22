'use client';
import { dataSideBar } from '@/constants';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SideBarLayout(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {dataSideBar.map((item, index) => (
        <div
          className={classNames('rounded-2xl text-sm', {
            'bg-[#ebfff2] font-semibold': pathname == item.path,
          })}>
          <Link href={item.path}>
            <div className="py-3 px-1">
              <span>{item.name}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
