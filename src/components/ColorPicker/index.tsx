import { Popover, Transition } from '@headlessui/react';
import invert from 'invert-color';
import { FC, HTMLProps } from 'react';
import { HexColorPicker } from 'react-colorful';
import { AiFillCaretDown } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

type ColorPickerProps = Omit<HTMLProps<HTMLButtonElement>, 'onChange'> & {
  name?: string;
  value?: string;
  onChange?: Parameters<typeof HexColorPicker>['0']['onChange'];
};

const ColorPicker: FC<ColorPickerProps> = ({
  children,
  className,
  value,
  name,
  onChange,
  ...props
}) => {
  const invertedColor = invert(value!);

  return (
    <Popover>
      <Popover.Button
        className={twMerge(
          'py-1 px-2 outline-none flex justify-center items-center gap-2 rounded transition hover:brightness-125 active:brightness-50 font-bold',
          className
        )}
        style={{
          backgroundColor: value,
          color: invertedColor,
          border: `1px solid ${invertedColor}`,
        }}
      >
        {children}
        <AiFillCaretDown />
      </Popover.Button>

      <Transition
        className="absolute z-10"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel>
          <HexColorPicker onChange={onChange} color={value} />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ColorPicker;
