/**
 * Skeleton loading state for project cards.
 *
 * Mimics the dimensions and layout of a ProjectCard to provide
 * a smooth loading experience.
 */

export function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-md">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200" />

      {/* Content placeholder */}
      <div className="space-y-4 p-6">
        {/* Title */}
        <div className="h-6 w-3/4 rounded bg-gray-200" />

        {/* Summary lines */}
        <div className="space-y-2">
          <div className="h-4 rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>

        {/* Badges */}
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-200" />
          <div className="h-6 w-20 rounded-full bg-gray-200" />
          <div className="h-6 w-18 rounded-full bg-gray-200" />
        </div>

        {/* Tech stack */}
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </div>
  );
}
