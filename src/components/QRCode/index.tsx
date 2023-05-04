import { FC, HTMLProps, useEffect, useState, useRef } from 'react';
import { ReactResizeDetectorDimensions } from 'react-resize-detector/build/types/types';
import { twMerge } from 'tailwind-merge';

import type QRCodeStyling from 'qr-code-styling';

export type QRProps = Omit<HTMLProps<HTMLDivElement>, 'size'> & {
  content: string;
  size: ReactResizeDetectorDimensions;
};

const QR: FC<QRProps> = ({ content, className, size, ...props }) => {
  const [qrCode, setQRCode] = useState<QRCodeStyling>();
  const ref = useRef(null);

  useEffect(() => {
    import('qr-code-styling').then(({ default: QRCodeStyling }) => {
      const qrCode = new QRCodeStyling({
        width: size.width,
        height: size.width,
        image:
          'https://st.depositphotos.com/2274151/3518/i/600/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg',
        dotsOptions: {
          color: '#4267b2',
          type: 'rounded',
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 20,
        },
      });

      setQRCode(qrCode);
    });
  }, [size]);

  useEffect(() => {
    if (qrCode && ref) qrCode.append(ref.current || undefined);
  }, [ref, qrCode]);

  useEffect(() => {
    if (qrCode) qrCode.update({ data: content });
  }, [content, qrCode]);

  return (
    <div className={twMerge('w-full h-full', className)} {...props} ref={ref} />
  );
};

export default QR;
