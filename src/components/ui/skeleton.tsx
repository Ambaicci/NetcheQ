export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg p-6">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
}

export function SkeletonButton() {
  return (
    <div className="animate-pulse">
      <div className="h-16 bg-gray-200 rounded-lg"></div>
    </div>
  );
}
