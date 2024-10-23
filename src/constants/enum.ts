export enum VoucherTypeEnum {
  FIXED = 'FIXED',
  PERCENT = 'PERCENT',
}

export enum PaymentEnum {
  OFFLINE_PAYMENT = 'OFFLINE_PAYMENT',
  DIGITAL_WALLET = 'DIGITAL_WALLET',
  CREDIT_CARD = 'CREDIT_CARD', // Using this method for both credit card and QR code
  QR_CODE = 'QR_CODE',
}
