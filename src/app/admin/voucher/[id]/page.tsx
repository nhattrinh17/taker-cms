import { CustomerVoucherSection } from '@/sections/admin/customerVoucher';

export default function DetailVoucher({ params }: { params: { id: string } }): JSX.Element {
  return <CustomerVoucherSection idVoucher={params.id} />;
}
