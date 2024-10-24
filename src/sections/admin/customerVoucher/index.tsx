'use client';

import { useAppDispatch } from '@/lib';
import { resetDataCustomerVoucher, setLimitOrPageCustomerVoucher } from '@/lib/redux/app/customerVoucher.slice';
import { PaginationControl } from '@/uiCore/LimitControl';
import Pagination from '@/uiCore/Pagination';
import Table from '@/uiCore/Table';
import { useCustomerVoucher } from '@/utils/handleCustomerVoucher';
import moment from 'moment';
import { useEffect } from 'react';

export function CustomerVoucherSection({ idVoucher }: { idVoucher: string }): JSX.Element {
  const { data, pagination, voucher } = useCustomerVoucher(idVoucher);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetDataCustomerVoucher());
    };
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="font-semibold"> Tên voucher: {voucher?.name}</h2>
      <p className="py-1">
        Mã code: <span className="font-bold">{voucher?.code}</span>
      </p>
      <p className="py-1">Thời gian bắt đầu được sử dụng: {moment(voucher?.startTime).format('YYYY-MM-DD HH:mm:ss')}</p>
      <p className="py-1">Thời gian dừng sử dụng: {moment(voucher?.endTime).format('YYYY-MM-DD HH:mm:ss')}</p>

      <Table
        //
        data={data}
        columnDelete
        columnEdit={false}
        backgroundColorHeader="var(--primaryColor)"
        columnToName={{
          id: 'ID',
          fullName: 'Tên khách hàng',
          phone: 'Số điện thoại',
          timeUse: 'Thời gian sử dụng',
          timeSave: 'Thì gian lưu',
        }}
      />

      <div className="pt-5 relative">
        <div className="absolute left-0 bottom-1/2 translate-y-1/2">
          <PaginationControl {...pagination} setLimit={(limit) => dispatch(setLimitOrPageCustomerVoucher({ limit: +limit }))} />
        </div>
        <Pagination
          {...pagination}
          setPage={(page) => {
            dispatch(setLimitOrPageCustomerVoucher({ page: page }));
          }}
        />
      </div>
    </div>
  );
}
