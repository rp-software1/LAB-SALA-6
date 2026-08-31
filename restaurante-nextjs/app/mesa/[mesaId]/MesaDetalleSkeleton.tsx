export default function MesaDetalleSkeleton() {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
      </div> 
      <div className="pt-4 border-t flex gap-2">
        <div className="h-9 bg-gray-200 rounded w-32" />
        <div className="h-9 bg-gray-200 rounded w-32" />
      </div>
    </div>
  );
}