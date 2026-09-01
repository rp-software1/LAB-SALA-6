export default function MesaPageLoading() {
  return (
    <div className="max-w-xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-6 w-1/3" />

      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="h-4 bg-gray-200 rounded mb-3 w-1/3" />

        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-9 bg-gray-200 rounded w-28"
            />
          ))}
        </div>
      </div>
    </div>
  );
}