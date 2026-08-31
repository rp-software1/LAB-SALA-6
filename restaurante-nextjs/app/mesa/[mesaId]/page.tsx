import { Suspense } from "react";
import { Metadata } from "next";
import { getMesaById } from "../../../src/services/api"; // Ruta relativa
import MesaDetalle from "./MesaDetalle";

interface PageProps {
  params: Promise<{ mesaId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { mesaId } = await params;
    const mesa = await getMesaById(mesaId);
    return {
      title: `Mesa ${mesa.numero} — Restaurante`,
    };
  } catch {
    return {
      title: `Mesa no encontrada — Restaurante`,
    };
  }
}

export default async function MesaDetailPage({ params }: PageProps) {
  const { mesaId } = await params;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalle de Mesa</h1>
      <Suspense fallback={<div className="animate-pulse h-32 bg-gray-200 rounded-lg" />}>
        <MesaDetalle mesaId={mesaId} />
      </Suspense>
    </div>
  );
}