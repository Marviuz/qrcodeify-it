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

  return <div className="w-full h-full" ref={ref} />;
};

export default QR;
