const Skeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
  );
};

export const CarCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-4 flex flex-col gap-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-6 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-9 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;