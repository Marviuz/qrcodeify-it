import getConfig from 'next/config';
import { FC, HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

export type HeaderProps = HTMLProps<HTMLDivElement> & {};

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const { publicRuntimeConfig } = getConfig();

  return (
    <header
      className={twMerge(
        'h-12 px-2 sticky top-0 left-0 bg-gray-700 border-gray-500 border-b',
        className
      )}
      {...props}
    >
      <div className="h-full">
        <div className="flex items-center w-full h-full text-white">
          <div className="italic font-bold">
            <span className="text-[#a4b6ef]">QRCode</span>
            ify It! <sub>v{publicRuntimeConfig.version}</sub>
          </div>
        </div>
      </div>
    </header>
  );
};
