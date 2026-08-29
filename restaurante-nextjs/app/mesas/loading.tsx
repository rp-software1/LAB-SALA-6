export default function MesasLoading() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        Mesas del Restaurante
      </h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border-2 border-gray-200 p-4"
          >
            <div className="mb-2 h-5 w-2/3 rounded bg-gray-200" />
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}