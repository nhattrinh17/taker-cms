'use client';

import { ButtonUiStyleOne } from '@/uiCore/ButtonStyle1';
import { OptionSelectBox } from '@/uiCore/OptionSelectBox';
import { SearchBox } from '@/uiCore/SearchBox';

export function VoucherAdminSection(): JSX.Element {
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
      </div>
    </div>
  );
}
