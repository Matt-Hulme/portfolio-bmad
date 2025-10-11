/**
 * Error message component with retry functionality.
 *
 * Displays user-friendly error messages with optional retry button.
 */

import { ApiError } from '@/lib/api';

interface ErrorMessageProps {
  /** Error object (standard Error or ApiError) */
  error: Error | null;
  /** Optional retry callback */
  onRetry?: () => void;
}

/**
 * Get user-friendly error message based on error type.
 */
function getErrorMessage(error: Error | null): string {
  if (!error) return 'An unknown error occurred';

  if (error instanceof ApiError) {
    switch (error.status) {
      case 404:
        return 'The requested resource was not found.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return error.message || 'Failed to load data from the server.';
    }
  }

  // Network errors
  if (error.message.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }

  return error.message || 'An unexpected error occurred.';
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const message = getErrorMessage(error);

  return (
    <div className="animate-fadeIn flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-6">
        {/* Error icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Error message */}
        <h3 className="mb-2 text-center text-lg font-semibold text-red-900">
          Error Loading Data
        </h3>
        <p className="mb-4 text-center text-red-700">{message}</p>

        {/* Retry button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-red-700"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
