export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse border rounded-xl p-4 shadow-md space-y-4">
      <div className="h-36 bg-gray-200 rounded-md" />
      <div className="h-4 bg-gray-200 rounded w-4/5" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-8 bg-gray-300 rounded mt-3 w-full" />
    </div>
  );
}