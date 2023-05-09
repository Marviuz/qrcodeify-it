import { Options } from 'qr-code-styling';
import { FC, useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

import type QRCodeStyling from 'qr-code-styling';

export type QRProps = Partial<Options> & {};

const QR: FC<QRProps> = (props) => {
  const [qrCode, setQRCode] = useState<QRCodeStyling>();
  const ref = useRef(null);

  useEffect(() => {
    import('qr-code-styling')
      .then(({ default: QRCodeStyling }) => {
        setQRCode(new QRCodeStyling(props));
      })
      .catch((err) => toast.error(err.message));
  }, [props]);

  useEffect(() => {
    if (qrCode && ref) qrCode.append(ref.current || undefined);
  }, [ref, qrCode]);

  useEffect(() => {
    if (qrCode) qrCode.update(props);
  }, [props, qrCode]);

  return (
    <>
      <div
        className="w-full h-full overflow-hidden border border-gray-500 rounded-lg"
        ref={ref}
      />
      {qrCode && (
        <button
          onClick={() => qrCode.download()}
          className="bg-[#a4b6ef] mt-2 text-white flex items-center justify-center w-full gap-2 px-2 py-1 font-bold transition rounded outline-none cursor-pointer hover:brightness-125 active:brightness-50"
        >
          Download
        </button>
      )}
    </>
  );
};

export default QR;
