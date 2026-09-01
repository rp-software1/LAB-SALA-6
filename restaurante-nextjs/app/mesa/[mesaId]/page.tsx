import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { mesasStore } from "../../../src/data/mesasStore";
import MesaDetalle from "./MesaDetalle";
import MesaDetalleSkeleton from "./MesaDetalleSkeleton";

interface PageProps {
  params: Promise<{ mesaId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { mesaId } = await params;
    const mesa = mesasStore.find((m) => m._id === mesaId);
    if (!mesa) throw new Error("No encontrada");
    return {
      title: `Mesa ${mesa.numero} — Restaurante`,
      description: `Estado: ${mesa.estado} | Capacidad: ${mesa.capacidad} personas`,
    };
  } catch {
    return {
      title: `Mesa no encontrada — Restaurante`,
    };
  } 
}

export default async function MesaDetailPage({ params }: PageProps) {
  const { mesaId } = await params;

  const mesa = mesasStore.find((m) => m._id === mesaId);
  if (!mesa) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Mesa {mesa.numero}
        <span className="ml-3 text-base font-normal text-gray-500 capitalize">
          {mesa.estado.replace("_", " ")}
        </span>
      </h1>

      <Suspense fallback={<MesaDetalleSkeleton />}>
        <MesaDetalle mesa={mesa} />
      </Suspense>
    </div>
  );
}