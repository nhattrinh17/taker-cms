import { createSlice } from '@reduxjs/toolkit';
import { VoucherItem } from './vouchers.slice';

export interface CustomerVoucherItem {
  id: string;
  customer: {
    fullName: string;
    phone: string;
  };
  timeUse: number;
  createdAt: number;
}

interface CustomerVouchersSlice {
  isFetchData: boolean;
  customerVouchers: CustomerVoucherItem[];
  voucher?: VoucherItem;
  page: number;
  limit: number;
  search: string;
  total: number;
}

const customerVouchersSlice = createSlice({
  name: 'customerVoucher',
  initialState: {
    isFetchData: true,
    customerVouchers: [],
    page: 1,
    limit: 10,
    search: '',
    phone: '',
    total: 0,
  } as CustomerVouchersSlice,
  reducers: {
    setDataCustomerVouchers: (state, action) => {
      state.customerVouchers = action.payload?.data;
      state.voucher = action.payload?.voucher;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isFetchData = false;
    },
    setLimitOrPageCustomerVoucher: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataCustomerVoucher: (state) => {
      state.customerVouchers = [];
      state.voucher = undefined;
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.isFetchData = true;
      state.search = '';
    },
    setFilterCustomerVoucher: (state, action: { payload: { search: string; phone: string } }) => {
      state.page = 1;
      state.search = action.payload.search;
    },
    refreshDataCustomerVoucher: (state) => {
      state.isFetchData = true;
    },
  },
});

export const { setDataCustomerVouchers, setLimitOrPageCustomerVoucher, resetDataCustomerVoucher, refreshDataCustomerVoucher, setFilterCustomerVoucher } = customerVouchersSlice.actions;

export default customerVouchersSlice.reducer;
