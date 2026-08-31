"use server";  

import { revalidatePath } from "next/cache";

export async function cambiarEstadoMesa(mesaId: string, nuevoEstado: string) {
  // Aquí puedes integrar tu llamada al backend real o simular la mutación
  // Ejemplo: await fetch(`${BASE_URL}/mesas/${mesaId}`, { method: 'PATCH', body: JSON.stringify({ estado: nuevoEstado }) });
  
  // Simulamos un retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Revalida la ruta para reflejar los cambios instantáneamente
  revalidatePath(`/mesa/${mesaId}`);
  revalidatePath(`/mesas`);
}