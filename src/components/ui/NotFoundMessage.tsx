interface NotFoundMessageProps {
  message: string;
}

export default function NotFoundMessage({ message }: NotFoundMessageProps) {
  return (
    <div className="flex items-center justify-center h-[50vh] w-full px-4">
      <p className="flex items-center gap-2 bg-white dark:bg-primary-dark border border-red-400 dark:border-red-200 text-red-600 dark:text-red-200 rounded-md px-4 py-2 text-center text-lg shadow-xs max-w-md">
        {/* Inline SVG warning icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
          role="img"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        {message}
      </p>
    </div>
  );
}
