import { FaRegFaceSadTear } from 'react-icons/fa6';
import { NoResultCardProps } from './types';

const NoResultCard = ({ title, content, className }: NoResultCardProps) => {
  return (
    <div
      className={`p-5 border border-neutral-05 rounded-lg shadow-card flex gap-4 ${className}`}
    >
      <div>
        <FaRegFaceSadTear className="text-primary-blue text-6xl" />
      </div>
      <div>
        <h1 className="font-semibold text-lg">{title}</h1>
        <p className="font-medium mt-2 text-sm">{content}</p>
      </div>
    </div>
  );
};
export default NoResultCard;
