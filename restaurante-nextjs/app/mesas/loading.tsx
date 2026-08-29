// app/mesas/loading.tsx
export default function MesasLoading() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mesas del Restaurante</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border-2 border-gray-200 rounded-lg p-4 animate-pulse"
          >
            <div className="h-5 bg-gray-200 rounded mb-2 w-2/3" />
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}