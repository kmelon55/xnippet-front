import { Link } from '@nextui-org/react';
import { FaArrowRight } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface RedirectCardProps {
  title: string;
  description: string;
  url?: string;
  onClick?: () => void;
  className?: string;
}

export default function RedirectCard(props: RedirectCardProps) {
  const { title, url, description, onClick, className } = props;

  return (
    <div className={twMerge('h-96 w-72', className)}>
      <Link
        onClick={onClick}
        href={url || '#'}
        className="block h-full truncate p-6 mx-auto w-full rounded-lg border border-gray-300 shadow-md hover:bg-gray-100 transition duration-300 ease-in-out"
      >
        <div className="text-black items-center	flex justify-between">
          <h5 className="text-black text-xl font-semibold tracking-tight">
            {title}
          </h5>
          <FaArrowRight />
        </div>
        <p className="mt-5 text-md text-gray-600 whitespace-normal break-keep">
          {description}
        </p>
      </Link>
    </div>
  );
}
