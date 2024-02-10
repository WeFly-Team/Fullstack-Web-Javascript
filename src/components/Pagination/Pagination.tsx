import { pagination } from './types';

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: pagination) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page + 1}
          className={`${
            currentPage === page + 1 ? 'bg-primary-darkBlue' : 'bg-primary-blue'
          } text-white px-4 py-2 rounded-md cursor-pointer`}
          onClick={() => onPageChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
