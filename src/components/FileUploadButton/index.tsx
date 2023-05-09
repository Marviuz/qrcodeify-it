import { FC, useId, HTMLProps, ChangeEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

type FileUploadButtonProps = Omit<
  HTMLProps<HTMLLabelElement>,
  'htmlFor' | 'onChange' | 'accept'
> &
  Pick<HTMLProps<HTMLInputElement>, 'accept'> & {
    onChange?: ChangeEventHandler<HTMLInputElement>;
  };

const FileUploadButton: FC<FileUploadButtonProps> = ({
  children,
  accept,
  onChange,
  className,
  ...props
}) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={twMerge(
        'cursor-pointer py-1 px-2 outline-none flex justify-center items-center gap-2 rounded transition hover:brightness-125 active:brightness-50 font-bold',
        className
      )}
      {...props}
    >
      {children}
      <input type="file" id={id} hidden onChange={onChange} accept={accept} />
    </label>
  );
};

export default FileUploadButton;
