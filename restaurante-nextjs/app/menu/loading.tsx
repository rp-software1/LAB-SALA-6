// app/carrito/loading.tsx
export default function CarritoLoading() {
  return ( 
    <div className="max-w-2xl mx-auto">
      <div className="h-8 bg-gray-200 rounded mb-6 w-1/3 animate-pulse" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-4 shadow-sm mb-3 animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2 w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}