/**
 * Generic loading state component.
 *
 * Supports multiple loading indicator types with smooth animations.
 */

import { ProgressBar } from './ProgressBar';
import { SkeletonCard } from './SkeletonCard';

type LoadingType = 'progress' | 'skeleton' | 'spinner';

interface LoadingStateProps {
  /** Type of loading indicator to display */
  type?: LoadingType;
  /** Number of skeleton cards to show (only for 'skeleton' type) */
  count?: number;
  /** Progress value 0-100 (only for 'progress' type) */
  progress?: number;
  /** Optional message to display */
  message?: string;
}

export function LoadingState({
  type = 'spinner',
  count = 6,
  progress = 50,
  message,
}: LoadingStateProps) {
  if (type === 'skeleton') {
    return (
      <div className="animate-fadeIn grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (type === 'progress') {
    return (
      <div className="animate-fadeIn flex flex-col items-center justify-center space-y-4 py-12">
        <div className="w-64">
          <ProgressBar progress={progress} />
        </div>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </div>
    );
  }

  // Default: spinner
  return (
    <div className="animate-fadeIn flex flex-col items-center justify-center space-y-4 py-12">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
}
