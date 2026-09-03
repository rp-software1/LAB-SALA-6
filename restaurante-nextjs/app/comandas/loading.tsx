export default function ComandasLoading() {
  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Título */}
      <div className="h-8 bg-gray-200 rounded mb-6 w-48 animate-pulse" />

      {/* Activas */}
      <div className="h-5 bg-gray-200 rounded mb-4 w-24 animate-pulse" />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">

        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border-2 border-gray-200 rounded-lg p-4 animate-pulse"
          >

            <div className="flex justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/3" />

              <div className="h-6 bg-gray-200 rounded-full w-24" />
            </div>

            <div className="h-3 bg-gray-200 rounded mb-3 w-full" />

            <div className="h-3 bg-gray-200 rounded mb-5 w-2/3" />

            <div className="border-t pt-3">
              <div className="h-4 bg-gray-200 rounded mb-4 w-full" />

              <div className="h-9 bg-gray-200 rounded w-full" />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}