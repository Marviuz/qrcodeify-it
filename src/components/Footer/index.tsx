import { FC, HTMLProps } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

export type FooterProps = HTMLProps<HTMLDivElement> & {};

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer
      {...props}
      className={twMerge(
        'py-3 border-t border-gray-500 h-full px-2',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between text-white">
          <div className="flex gap-2">
            {/* TODO: github link */}
            <a href="#">
              <AiFillGithub className="text-3xl" />
            </a>
          </div>
          <p>Made with 💖 and JavaScript!</p>
        </div>
      </div>
    </footer>
  );
};
