export default function CarritoLoading() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 h-8 w-1/3 animate-pulse rounded bg-gray-200" />
 
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="mb-3 animate-pulse rounded-lg bg-white p-4 shadow-sm"
        >
          <div className="mb-2 h-4 w-2/3 rounded bg-gray-200" />
          <div className="h-3 w-1/3 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}