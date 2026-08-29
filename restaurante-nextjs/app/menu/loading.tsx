export default function MenuLoading() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        Menú del Restaurante
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border p-4"
          >
            <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />

            <div className="mb-2 h-4 w-full rounded bg-gray-200" />

            <div className="mb-4 h-4 w-1/4 rounded bg-gray-200" />

            <div className="flex justify-between">
              <div className="h-6 w-1/4 rounded bg-gray-200" />

              <div className="h-6 w-1/4 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}