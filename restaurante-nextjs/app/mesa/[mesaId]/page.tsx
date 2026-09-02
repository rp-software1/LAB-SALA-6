import Link from "next/link";
import { getMesaById } from "../../../src/services/api";
import MesaDetalle from "./MesaDetalle";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MesaDetailPage(props: any) {
  // Extrae el ID de params sin importar si es Promesa o un objeto directo
  const rawParams = await Promise.resolve(props.params);
  const paramId = rawParams?.mesaid || rawParams?.id || "1";
  
  let mesa = null;
  try {
    mesa = await getMesaById(paramId);
  } catch (error) {
    // Fallback: Si no encuentra la mesa por ID, intenta cargar la Mesa 1
    try {
      mesa = await getMesaById("1");
    } catch (e) {
      mesa = null;
    }
  }

  if (!mesa) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-xl font-bold text-red-600 mb-2">Error al cargar la mesa</h1>
        <Link href="/mesas" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Volver a las mesas
        </Link>
      </div>
    );
  }

  const estadoLimpio = (mesa.estado ?? 'disponible').toString().replace("_", " ");

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link href="/mesas" className="text-blue-600 hover:underline mb-4 inline-block font-medium">
        ← Volver a las mesas
      </Link>
      <h1 className="text-2xl font-bold mb-6">
        Mesa {mesa.numero}
        <span className="ml-3 text-base font-normal text-gray-500 capitalize">
          ({estadoLimpio})
        </span>
      </h1>

      <MesaDetalle mesa={mesa} />
    </div>
  );
}