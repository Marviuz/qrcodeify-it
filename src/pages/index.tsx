import Image from 'next/image';
import QRCode from 'qrcode';
import { useEffect, useId, useState } from 'react';
import { toast } from 'react-hot-toast';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Home() {
  const [data, setData] = useState('');
  const [qr, setQR] = useState('');
  const textAreaId = useId();

  useEffect(() => {
    if (data) {
      QRCode.toDataURL(data)
        .then(setQR)
        .catch((error) => {
          if (error instanceof Error) toast.error(error.message);
          throw error;
        });
    }
  }, [data]);

  return (
    <>
      <Header />
      <main className="w-full">
        <div className="flex flex-col gap-2 mx-auto max-w-[1440px] w-full md:flex-row px-2 mt-11 mb-96">
          <label
            htmlFor={textAreaId}
            className="w-full p-2 text-white transition-all bg-gray-600 border border-gray-500 rounded-lg focus-within:border-gray-400 grow"
          >
            <textarea
              id={textAreaId}
              className="w-full h-full bg-transparent outline-none resize-none"
              placeholder="Enter you want to QRCode"
              value={data}
              onChange={(evt) => setData(evt.target.value)}
            />
          </label>
          <div className="w-full md:max-w-[24rem] aspect-square grow-0">
            <div className="relative w-full h-full overflow-hidden border border-gray-500 rounded-lg">
              {qr && data ? (
                <Image
                  src={qr}
                  alt={`${data} QR Code`}
                  fill
                  className="object-contain w-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-white">
                  No text, no QR.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
