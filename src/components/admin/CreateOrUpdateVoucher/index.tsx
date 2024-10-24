import { PaymentEnum, VoucherTypeEnum } from '@/constants';
import { useAppDispatch } from '@/lib';
import { VoucherItem } from '@/lib/redux/app/vouchers.slice';
import { ButtonUiStyleOne } from '@/uiCore/ButtonStyle1';
import { FormGroup2 } from '@/uiCore/FormGroup';
import { MultipleOptionsBox } from '@/uiCore/MultipleOptionsBox';
import { OptionSelectBox } from '@/uiCore/OptionSelectBox';
import { handleCreateVoucher, handleUpdateBlogCategory } from '@/utils/handleVoucher';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface PropsDto {
  onClose: () => void;
  voucherItemInit?: VoucherItem;
  idVoucher?: string;
}

export function CreateOrUpdateVoucher({ onClose, voucherItemInit, idVoucher }: PropsDto): JSX.Element {
  const [name, setName] = useState(voucherItemInit?.name);
  const [code, setCode] = useState(voucherItemInit?.code);
  const [description, setDescription] = useState(voucherItemInit?.description);
  const [paymentMethod, setPaymentMethod] = useState(voucherItemInit?.paymentMethod);
  const [discount, setDiscount] = useState(voucherItemInit?.discount);
  const [discountToUp, setDiscountToUp] = useState(voucherItemInit?.discountToUp);
  const [minimumOrder, setMinimumOrder] = useState(voucherItemInit?.minimumOrder);
  const [quantity, setQuantity] = useState(voucherItemInit?.quantity);
  const [startTime, setStartTime] = useState(voucherItemInit?.startTime);
  const [endTime, setEndTime] = useState(voucherItemInit?.endTime);
  const [typeDiscount, setTypeDiscount] = useState(voucherItemInit?.typeDiscount);
  const [isGlobal, setIsGlobal] = useState(voucherItemInit?.isGlobal || false);
  const dispatch = useAppDispatch();
  return (
    <div onClick={onClose} className="z-10 fixed top-0 left-0 right-0 bottom-0 h-screen overflow-y-auto bg-[var(--backgroundModal)]">
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-[80vh] max-w-full h-auto mx-auto mt-8 rounded-lg px-4 py-7">
        <div className="py-4 relative w-full border-b">
          <h2 className="font-semibold text-base">{idVoucher ? 'Cập nhật voucher' : 'Tạo mới voucher'}</h2>
          <FontAwesomeIcon onClick={onClose} icon={faXmark} className="absolute top-1/2 right-0 -translate-y-1/2 text-xl cursor-pointer" />
        </div>
        <form className="py-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <FormGroup2 label="Tên voucher" onChange={setName} placeholder="Nhập voucher" typeInput="text" value={name} required colorLabel="var(--textColorDefault)" />
            <FormGroup2 label="Phát hành cho tất cả người dùng" onChange={setIsGlobal} placeholder="Số tiền " typeInput="checkbox" value={isGlobal} colorLabel="var(--textColorDefault)" />
            <FormGroup2 label="Mã Code" onChange={setCode} placeholder="Nhập code" typeInput="text" value={code} required colorLabel="var(--textColorDefault)" />
            <FormGroup2 label="Discount" onChange={setDiscount} placeholder="Nhập số tiền giảm giá (% hoặc cố định)" typeInput="number" value={discount} required colorLabel="var(--textColorDefault)" />
            <FormGroup2 label="Giảm giá tối đa" onChange={setDiscountToUp} placeholder="Số tiền giảm giá tối đa" typeInput="number" value={discountToUp} required colorLabel="var(--textColorDefault)" />
            <div className="h-fit">
              <OptionSelectBox
                label="Hình thức giảm giá"
                data={[
                  {
                    name: 'Cố định',
                    value: VoucherTypeEnum.FIXED,
                  },
                  {
                    name: 'Theo %',
                    value: VoucherTypeEnum.PERCENT,
                  },
                ]}
                name="typeDiscount"
                onChange={async (value) => {
                  setTypeDiscount(value);
                }}
                placeholder="Chọn hình thức"
                required
                colorLabel="var(--textColorDefault)"
              />
            </div>
            <MultipleOptionsBox
              required
              colorLabel="var(--textColorDefault)"
              data={[
                {
                  name: 'Trực tiếp',
                  value: PaymentEnum.OFFLINE_PAYMENT,
                },
                {
                  name: 'Ví taker',
                  value: PaymentEnum.DIGITAL_WALLET,
                },
                {
                  name: 'Qua VnPay',
                  value: PaymentEnum.CREDIT_CARD,
                },
              ]}
              onValueChange={setPaymentMethod}
              placeholder="Chọn phương thức thanh toán"
              label="Phương thức thanh toán hỗ trợ"
              value={paymentMethod}
            />
            <FormGroup2 label="Giá trị đơn hàng tôi thiểu" onChange={setMinimumOrder} placeholder="Số tiền " typeInput="number" value={minimumOrder} required colorLabel="var(--textColorDefault)" />
            <FormGroup2 label="Số lượng voucher phát hành" onChange={setQuantity} placeholder="Số tiền " typeInput="number" value={quantity} required colorLabel="var(--textColorDefault)" />
            <FormGroup2 minValue={new Date().toISOString()} label="Thời gian bắt đầu sự kiện" onChange={setStartTime} placeholder="Số tiền " typeInput="datetime-local" value={startTime} required colorLabel="var(--textColorDefault)" />
            <FormGroup2 minValue={new Date().toISOString()} label="Thời gian kết thúc sự kiện" onChange={setEndTime} placeholder="Số tiền " typeInput="datetime-local" value={endTime} colorLabel="var(--textColorDefault)" />
            <div className="col-span-2">
              <FormGroup2 label="Giới thiệu voucher" onChange={setDescription} placeholder="Giới thiệu " typeInput="textarea" value={description} required colorLabel="var(--textColorDefault)" />
            </div>

            <ButtonUiStyleOne
              onPress={async () => {
                const data = {
                  name,
                  code,
                  description,
                  paymentMethod,
                  discount,
                  discountToUp,
                  minimumOrder,
                  quantity,
                  startTime,
                  typeDiscount,
                  isGlobal,
                };
                const res = idVoucher ? await handleUpdateBlogCategory(idVoucher, data, dispatch) : await handleCreateVoucher(data, dispatch);
                res && onClose();
              }}
              disabled={!name || !code || !description || !paymentMethod || !discount || !discountToUp || !discountToUp || !minimumOrder || !quantity || !startTime || !typeDiscount}
              backgroundColor="var(--primaryColor)"
              content="Xác nhận"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
