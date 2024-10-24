import { useAppDispatch, useAppSelector } from '@/lib';
import { setDataCustomerVouchers } from '@/lib/redux/app/customerVoucher.slice';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import moment from 'moment';
import { useEffect } from 'react';
import { getAllCustomerVoucher } from './api';

export const useCustomerVoucher = (idVoucher?: string) => {
  const { isFetchData, customerVouchers, voucher, page, limit, total } = useAppSelector((state) => state.customerVoucher);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (isFetchData && idVoucher) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllCustomerVoucher(idVoucher, page, limit);
        if (res?.data) {
          const { data, pagination, voucher } = res?.data;
          dispatch(setDataCustomerVouchers({ data, voucher, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isFetchData]);

  return {
    data:
      customerVouchers.map((i) => {
        return {
          id: i.id,
          fullName: i.customer.fullName,
          phone: i.customer.phone,
          timeUse: i.timeUse ? moment(i.timeUse).format('YYYY-MM-DD HH:mm:ss') : 'Chưa sử dụng',
          timeSave: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
    voucher,
    pagination: {
      page,
      limit,
      total,
    },
  };
};

// export const handleCreateCustomerVoucher = async (data: any, dispatch: any) => {
//   const req = await createCustomerVoucher(data);
//   if (req?.data) {
//     dispatch(resetDataCustomerVoucher());
//     return true;
//   } else {
//     return false;
//   }
// };

// export const handleUpdateBlogCategory = async (id: string, data: any, dispatch: any) => {
//   const req = await updateCustomerVoucher(id, data);
//   if (req?.data) {
//     dispatch(resetDataCustomerVoucher());
//     return true;
//   } else {
//     return false;
//   }
// };
