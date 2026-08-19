import React from "react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid'

const PaginationComponent = ({ page, setPage, max }) => {
  const maxPages = Math.ceil(max);
  
  if (maxPages <= 1) return null;

  return (
    <div className="flex items-center justify-center pt-20 pb-10">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
        >
          <span className="sr-only">First</span>
          <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        
        {/* Render page numbers */}
        {[...Array(maxPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
              page === i + 1
                ? 'z-10 bg-[#357ABD] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#357ABD]'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === maxPages}
          className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          onClick={() => setPage(maxPages)}
          disabled={page === maxPages}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
        >
          <span className="sr-only">Last</span>
          <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default PaginationComponent;
