import { createSlice } from '@reduxjs/toolkit';

export interface VoucherItem {
  id: string;
  name: string;
  description: string;
  code: string;
  paymentMethod: string;
  discount: number;
  typeDiscount: string;
  discountToUp: number;
  minimumOrder: number;
  totalUse: number;
  quantity: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  isGlobal: boolean;
}

interface VouchersSlice {
  isFetchData: boolean;
  vouchers: VoucherItem[];
  page: number;
  limit: number;
  search: string;
  total: number;
  phone: string;
}

const vouchersSlice = createSlice({
  name: 'voucher',
  initialState: {
    isFetchData: true,
    vouchers: [],
    page: 1,
    limit: 10,
    search: '',
    phone: '',
    total: 0,
  } as VouchersSlice,
  reducers: {
    setDataVouchers: (state, action) => {
      state.vouchers = action.payload?.data;
      state.total = action.payload?.total;
      state.page = action.payload.page;
      state.isFetchData = false;
    },
    setLimitOrPageVoucher: (state, action: { payload: { limit?: number; page?: number } }) => {
      state.limit = action.payload.limit ? action.payload.limit : state.limit;
      state.page = action.payload.page ? action.payload.page : state.page;
    },
    resetDataVoucher: (state) => {
      state.vouchers = [];
      state.page = 1;
      state.limit = 10;
      state.total = 0;
      state.isFetchData = true;
      state.search = '';
      state.phone = '';
    },
    setFilterVoucher: (state, action: { payload: { search: string; phone: string } }) => {
      state.page = 1;
      state.search = action.payload.search;
      state.phone = action.payload.phone;
    },
    refreshDataVoucher: (state) => {
      state.isFetchData = true;
    },
  },
});

export const { setDataVouchers, setLimitOrPageVoucher, resetDataVoucher, refreshDataVoucher, setFilterVoucher } = vouchersSlice.actions;

export default vouchersSlice.reducer;
