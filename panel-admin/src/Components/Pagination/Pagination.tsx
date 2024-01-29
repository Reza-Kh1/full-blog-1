import { PaginationType } from "../../type";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
type Pager = {
  page: number;
  setPage: (value: number) => void;
  pagination: PaginationType;
};
export default function Pagination({ page, setPage, pagination }: Pager) {
  return (
    <div className="flex items-center justify-center py-2">
      {pagination.prevPage && (
        <button
          aria-label="d"
          aria-hidden="true"
          className="bg-blue-300 py-3 px-3 rounded-full mx-2"
          onClick={() => {
            if (pagination.prevPage) {
              setPage(pagination.prevPage);
            }
          }}
        >
          <i>
            <FaAnglesRight />
          </i>
        </button>
      )}
      {pagination.allPage &&
        Array.from({ length: pagination.allPage }, (_, i) => i + 1).map((i) => {
          return (
            <button
              aria-label="d"
              aria-hidden="true"
              onClick={() => setPage(i)}
              key={i}
              className={`py-2 px-4 rounded-full mx-2 ${
                i === Number(page) ? "bg-gray-600 text-gray-200" : "bg-blue-300"
              }`}
              disabled={i === Number(page)}
            >
              {i}
            </button>
          );
        })}
      {pagination.nextPage && (
        <button
          aria-label="d"
          aria-hidden="true"
          className="bg-blue-300 py-3 px-3 rounded-full mx-2"
          onClick={() => {
            if (pagination.nextPage) {
              setPage(pagination.nextPage);
            }
          }}
        >
          <i>
            <FaAnglesLeft />
          </i>
        </button>
      )}
    </div>
  );
}
