'use client';

import { CreateOrUpdateVoucher } from '@/components/admin/CreateOrUpdateVoucher';
import { useAppDispatch } from '@/lib';
import { resetDataVoucher } from '@/lib/redux/app/vouchers.slice';
import { ButtonUiStyleOne } from '@/uiCore/ButtonStyle1';
import { OptionSelectBox } from '@/uiCore/OptionSelectBox';
import { SearchBox } from '@/uiCore/SearchBox';
import { useVoucher } from '@/utils/handleVoucher';
import { useEffect, useState } from 'react';

export function VoucherAdminSection(): JSX.Element {
  const { data, pagination } = useVoucher();
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const [idVoucher, setIdVoucher] = useState('');
  const voucherById = data.find((i) => i.id == idVoucher);

  useEffect(() => {
    return () => {
      dispatch(resetDataVoucher());
    };
  }, []);

  return (
    <div className="px-4 py-6">
      <div className="flex gap-2 h-10">
        <SearchBox isFetching onFetch={async (value) => console.log(value)} name="search-voucher" />

        <OptionSelectBox
          data={[
            {
              name: 'Đang chờ',
              value: 'pending',
            },
            {
              name: 'Đang hoạt động',
              value: 'active',
            },
          ]}
          name="optionSelectVoucher"
          onFetch={async (value) => console.log(value)}
          placeholder="Tất cả"
        />

        <ButtonUiStyleOne backgroundColor="var(--primaryColor)" content="Tạo mới" disabled={false} onPress={() => {}} />

        {/* {
            isCreating && <
          } */}
        <CreateOrUpdateVoucher title="Tạo mới voucher" />
      </div>
    </div>
  );
}
