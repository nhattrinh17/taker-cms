'use client';

import { CreateOrUpdateVoucher } from '@/components/admin/CreateOrUpdateVoucher';
import { useAppDispatch } from '@/lib';
import { resetDataVoucher } from '@/lib/redux/app/vouchers.slice';
import { ButtonUiStyleOne } from '@/uiCore/ButtonStyle1';
import { PaginationControl } from '@/uiCore/LimitControl';
import { OptionSelectBox } from '@/uiCore/OptionSelectBox';
import Pagination from '@/uiCore/Pagination';
import { SearchBox } from '@/uiCore/SearchBox';
import Table from '@/uiCore/Table';
import { useVoucher } from '@/utils/handleVoucher';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function VoucherAdminSection(): JSX.Element {
  const { data, pagination } = useVoucher();
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const [idVoucher, setIdVoucher] = useState('');
  const voucherById = data.find((i) => i.id == idVoucher);
  const router = useRouter();

  useEffect(() => {
    return () => {
      dispatch(resetDataVoucher());
    };
  }, []);

  return (
    <div className="px-4 py-6 h-full flex flex-col overflow-hidden">
      <div className="flex gap-2 h-10">
        <SearchBox isFetching onFetch={async (value) => console.log(value)} name="search-voucher" />

        <div className="w-fit">
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
            onChange={async (value) => console.log(value)}
            placeholder="Tất cả"
          />
        </div>

        <ButtonUiStyleOne backgroundColor="var(--primaryColor)" content="Tạo mới" disabled={false} onPress={() => setIsCreating(true)} />

        {isCreating || idVoucher ? (
          <CreateOrUpdateVoucher
            voucherItemInit={voucherById}
            onClose={() => {
              isCreating && setIsCreating(false);
              idVoucher && setIdVoucher('');
            }}
            idVoucher={idVoucher}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex-1 h-max overflow-hidden flex flex-col">
        <div className="h-full flex-1 overflow-hidden">
          <Table
            //
            data={data}
            columnDelete
            columnEdit
            backgroundColorHeader="var(--primaryColor)"
            columnToName={{
              id: 'ID',
              name: 'Tên voucher',
              code: 'Mã voucher',
              description: 'Mô tả',
              paymentMethod: 'Phương thức thanh toán',
              discount: 'Giảm giá',
              typeDiscount: 'Loại giảm giá',
              discountToUp: 'Giảm giá tối đa',
              minimumOrder: 'Đơn hàng tối thiểu',
              totalUse: 'Tổng số lần sử dụng',
              quantity: 'Số lượng',
              startTime: 'Thời gian bắt đầu',
              endTime: 'Thời gian kết thúc',
              isGlobal: 'Áp dụng tất cả khách hàng',
              createdAt: 'Thời gian tạo',
            }}
            handleEdit={(id) => setIdVoucher(id)}
            moreColumnsOptions={[
              {
                icon: faTicket,
                name: 'Khách hàng',
                handleClick(item) {
                  router.replace(`/admin/voucher/${item?.id}`);
                },
              },
            ]}
          />
        </div>

        <div className="pt-5 relative">
          <div className="absolute left-0 bottom-1/2 translate-y-1/2">
            <PaginationControl {...pagination} setLimit={(limit) => {}} />
          </div>
          <Pagination {...pagination} setPage={(page) => {}} />
        </div>
      </div>
    </div>
  );
}
