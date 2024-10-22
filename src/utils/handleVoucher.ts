import { useAppDispatch, useAppSelector } from '@/lib';
import { setDataVouchers } from '@/lib/redux/app/vouchers.slice';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import moment from 'moment';
import { useEffect } from 'react';
import { getAllVoucher } from './api';

export const useVoucher = (limitCustom?: number) => {
  const { isFetchData, vouchers, page, limit, total, search } = useAppSelector((state) => state.voucher);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (isFetchData) {
        dispatch(setLoadingApp({ loading: true }));
        const res = await getAllVoucher(search, page, limitCustom || limit);
        if (res?.data) {
          const { data, pagination } = res?.data;
          dispatch(setDataVouchers({ data, ...pagination }));
        }
        dispatch(setLoadingApp({ loading: false }));
      }
    }

    fetchData();
  }, [isFetchData]);

  return {
    data:
      vouchers.map((i) => {
        return {
          ...i,
          createdAt: moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        };
      }) || [],
    pagination: {
      page,
      limit,
      total,
    },
  };
};

// export const handleCreateVoucher = async (data: any, dispatch: any) => {
//   const req = await createVoucher(data);
//   if (req?.data) {
//     dispatch(resetDataVoucher());
//   } else {
//     return false;
//   }
// };

// export const handleUpdateBlogCategory = async (id: number, data: any, dispatch: any) => {
//   const req = await updateBlogCategory(id, data);
//   if (req?.data) {
//     dispatch(resetDataVoucher());
//   } else {
//     return false;
//   }
// };
