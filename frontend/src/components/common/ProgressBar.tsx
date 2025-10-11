/**
 * Animated progress bar component.
 *
 * Displays a horizontal progress bar that fills from 0 to 100%
 * with smooth CSS transitions.
 */

interface ProgressBarProps {
  /** Progress value from 0 to 100 */
  progress: number;
  /** Optional height in pixels (default: 4) */
  height?: number;
  /** Optional color (default: primary blue) */
  color?: string;
}

export function ProgressBar({
  progress,
  height = 4,
  color = 'bg-blue-600',
}: ProgressBarProps) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className="w-full overflow-hidden rounded-full bg-gray-200"
      style={{ height: `${height}px` }}
    >
      <div
        className={`h-full ${color} transition-all duration-300 ease-out`}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}
