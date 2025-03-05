import { useAtom } from 'jotai';
import Head from 'next/head';
import { useId, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import QR from '@/components/QRCode';
import QROptions from '@/components/QROptions';
import { qrOptions } from '@/store/qrOptions';

export default function Home() {
  const [data, setData] = useState('');
  const textAreaId = useId();
  const { ref, ...sizes } = useResizeDetector();

  const [options, setOptions] = useAtom(qrOptions);

  return (
    <>
      <Head>
        <title>QRCodeify It!</title>
      </Head>
      <Header />
      <main className="w-full">
        <div className="flex flex-col gap-2 mx-auto max-w-[1440px] w-full px-2 mt-7 mb-80">
          <p className="my-4 italic text-white">
            Yet another QR Code generator...
          </p>
          <div className="flex flex-col items-start w-full gap-2 sm:flex-row">
            <label
              htmlFor={textAreaId}
              className="self-stretch w-full p-2 text-white transition-all bg-gray-600 border border-gray-500 rounded-lg focus-within:border-gray-400 grow"
            >
              <textarea
                id={textAreaId}
                className="w-full h-full bg-transparent outline-none resize-none"
                placeholder="Enter you want to QRCode"
                value={data}
                onChange={(evt) => setData(evt.target.value)}
              />
            </label>
            <QROptions {...options} onChange={setOptions} />
            <div className="w-full md:max-w-[24rem] aspect-square grow-0 z-0">
              <div className="relative w-full h-full -z-10" ref={ref}>
                {data ? (
                  <QR
                    {...options}
                    data={data}
                    width={sizes.width}
                    height={sizes.width}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-xl italic font-bold text-white border border-gray-500 rounded-lg">
                    No text, no QR...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
