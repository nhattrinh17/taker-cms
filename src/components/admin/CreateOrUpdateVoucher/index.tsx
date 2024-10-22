import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PropsDto {
  title: string;
}

export function CreateOrUpdateVoucher({ title }: PropsDto): JSX.Element {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-screen overflow-y-auto bg-[var(--backgroundModal)]">
      <div className="bg-white w-[80vh] max-w-full h-auto mx-auto mt-8 rounded-lg px-4 py-7">
        <div className="py-4 relative w-full border-b">
          <h2 className="font-semibold text-base">{title}</h2>
          <FontAwesomeIcon icon={faXmark} className="absolute top-1/2 right-0 -translate-y-1/2 text-xl" />
        </div>
        <form></form>
      </div>
    </div>
  );
}
