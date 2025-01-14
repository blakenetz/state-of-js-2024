import React from "react";

export default function CardSkeleton() {
  return (
    <div
      role="status"
      className="max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow animate-pulse"
    >
      <div className="bg-white flex justify-center content-center h-37">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"></path>
        </svg>
      </div>

      <div className="p-5">
        <div className="h-2xl mb-2 bg-gray-900 dark:bg-white rounded-full"></div>

        <div className="h-2 bg-gray-900 dark:bg-neutral-300"></div>
        <div className="h-2 bg-gray-900 dark:bg-neutral-300"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
