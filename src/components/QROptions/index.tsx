import { RadioGroup } from '@headlessui/react';
import { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

import ColorPicker from '../ColorPicker';
import FileUploadButton from '../FileUploadButton';

import { DOT_TYPES, QRSettings } from './helpers/form';

type QROptionsType<T = Partial<QRSettings>> = T & {
  onChange: (options: T) => any;
};

const QROptions: FC<QROptionsType> = ({ onChange, ...options }) => {
  return (
    <div className="flex flex-col flex-1 w-full gap-2">
      <div>
        <div className="font-semibold text-white">Background</div>
        <ColorPicker
          className="w-full mt-1"
          value={options.backgroundOptions?.color}
          onChange={(color) => {
            const clone = { ...options };
            if (clone.backgroundOptions?.color) {
              clone.backgroundOptions.color = color;
              onChange(clone);
            }
          }}
        >
          Background color
        </ColorPicker>
      </div>

      <div>
        <div className="font-semibold text-white">Dots</div>
        <ColorPicker
          className="w-full mt-1"
          value={options.dotsOptions?.color}
          onChange={(color) => {
            const clone = { ...options };
            if (clone.dotsOptions?.color) {
              clone.dotsOptions.color = color;
              onChange(clone);
            }
          }}
        >
          Background color
        </ColorPicker>
      </div>

      <div>
        <div className="font-semibold text-white">Dot type</div>
        <RadioGroup
          className="flex flex-col gap-2 mt-1"
          value={options.dotsOptions?.type}
          onChange={(dotType) => {
            const clone = { ...options };
            if (clone.dotsOptions?.type) {
              clone.dotsOptions.type = dotType;
              onChange(clone);
            }
          }}
        >
          {DOT_TYPES.map((type) => (
            <RadioGroup.Option value={type} key={type}>
              {({ checked }) => (
                <div
                  className={twMerge(
                    'w-full h-full transition text-white cursor-pointer uppercase border border-[#a4b6ef] px-4 py-1 rounded-full font-bold',
                    checked ? 'bg-[#a4b6ef]' : 'hover:scale-105 active:scale-95'
                  )}
                >
                  {type}
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-1">
        <div className="font-semibold text-white">Spacing</div>
        <input
          type="number"
          className="px-2 py-1 rounded-full outline-none"
          value={options.margin}
          onChange={(evt) => {
            const clone = { ...options };
            const spacing = evt.target.value;
            clone.margin = parseInt(spacing) || 0;
            onChange(clone);
          }}
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <div className="font-semibold text-white">Logo</div>
        <div className="flex gap-1">
          <FileUploadButton
            title={options.imageName}
            className="bg-[#a4b6ef] rounded-full text-white w-full "
            type="file"
            accept="image/*"
            onChange={(evt) => {
              const [file] = evt.target.files || [];
              if (file) {
                const clone = { ...options };
                clone.image = URL.createObjectURL(file);
                clone.imageName = file.name;
                onChange(clone);
              }
            }}
          >
            <div className="max-w-xs truncate">
              {options.imageName ? options.imageName : 'Choose logo'}
            </div>
          </FileUploadButton>
          {options.image && options.imageName && (
            <button
              className="rounded-full bg-[#a4b6ef] shrink-0 h-8 w-8 flex justify-center items-center text-white hover:brightness-125 active:brightness-50"
              onClick={() => {
                const clone = { ...options };
                delete clone.image;
                delete clone.imageName;
                onChange(clone);
              }}
            >
              <AiOutlineClose />
            </button>
          )}
        </div>
        <input
          type="number"
          className="px-2 py-1 rounded-full outline-none"
          value={options.imageOptions?.margin}
          onChange={(evt) => {
            const clone = { ...options };
            const spacing = evt.target.value;
            if (typeof clone.imageOptions?.margin === 'number')
              clone.imageOptions.margin = parseInt(spacing) || 0;
            onChange(clone);
          }}
        />
      </div>
    </div>
  );
};

export default QROptions;
