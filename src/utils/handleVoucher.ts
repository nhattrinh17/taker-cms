import { useAppDispatch, useAppSelector } from '@/lib';
import { resetDataVoucher, setDataVouchers } from '@/lib/redux/app/vouchers.slice';
import { setLoadingApp } from '@/lib/redux/system/settingSys';
import moment from 'moment';
import { useEffect } from 'react';
import { createVoucher, getAllVoucher, updateVoucher } from './api';

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
          startTime: moment(i.startTime).format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(i.endTime).format('YYYY-MM-DD HH:mm:ss'),
          // isGlobal: i.isGlobal ? 'Áp dụng' : 'Không áp dụng',
        };
      }) || [],
    pagination: {
      page,
      limit,
      total,
    },
  };
};

export const handleCreateVoucher = async (data: any, dispatch: any) => {
  const req = await createVoucher(data);
  if (req?.data) {
    dispatch(resetDataVoucher());
    return true;
  } else {
    return false;
  }
};

export const handleUpdateBlogCategory = async (id: string, data: any, dispatch: any) => {
  const req = await updateVoucher(id, data);
  if (req?.data) {
    dispatch(resetDataVoucher());
    return true;
  } else {
    return false;
  }
};
