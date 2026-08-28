interface MesaDetailProps {
  params: {
    mesaId: string; // siempre string en Next.js
  };
}

export default function MesaDetailPage({ params }: MesaDetailProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalle de Mesa</h1>
      <p>ID recibido: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{params.mesaId}</span></p>
      <p className="text-gray-500 mt-4">Aquí irá la información de la mesa — conectar en Día 4</p>
    </div>
  );
}