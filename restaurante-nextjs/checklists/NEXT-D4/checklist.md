---
sala: I-SALA1
curso: Next.js
dia: 4 
estado: en_progreso
loom: 
---

## Bloques
- [X] A — getMesaById en api.ts + verificar con Postman
- [X] B — page.tsx con fetch real + generateMetadata + notFound()
- [X] C — MesaDetalle Client Component + Suspense manual
- [x] D — Server Action cambiarEstadoMesa + revalidatePath
- [ ] E — Verificación TypeScript + flujo completo
- [ ] F — Evaluación entre pares + Loom + PRs

## Verificación final
- [X] Clic en mesa → /mesa/[id] muestra datos reales
- [X] Pestaña del browser muestra "Mesa N — Restaurante"
- [X] Cambiar estado → la mesa en /mesas se actualiza
- [X] npx tsc --noEmit → 0 errores 
- [ ] PR aprobado por sala par
