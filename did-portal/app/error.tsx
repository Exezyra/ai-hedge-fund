'use client';

import { useEffect, useState } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      reset();
    }, 4000);

    return () => clearTimeout(timer);
  }, [reset]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto max-w-xl w-full mx-4 bg-red-50 dark:bg-red-900/90 text-red-800 dark:text-red-50 border border-red-200 dark:border-red-700 shadow-lg rounded-lg px-4 py-3 flex items-start gap-3">
        <div className="mt-0.5">
          <svg
            className="h-5 w-5 text-red-500 dark:text-red-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">
            A client-side error occurred
          </p>
          <p className="mt-1 text-xs text-red-700 dark:text-red-100/80">
            Something went wrong while rendering this page. We will automatically retry. If the problem persists, please refresh the page or try again later.
          </p>
          {/* You can temporarily show error.message here for debugging */}
          {/* <p className="mt-1 text-[11px] text-red-700/80 dark:text-red-100/70 break-all">
            {error.message}
          </p> */}
        </div>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            reset();
          }}
          className="ml-2 text-xs text-red-700 dark:text-red-100 hover:text-red-900 dark:hover:text-white font-medium"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}


