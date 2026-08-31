export default function MesaLoading() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />
      <div className="h-40 bg-gray-100 rounded-lg p-4 space-y-3 animate-pulse">
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}