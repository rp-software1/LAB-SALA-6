---
sala: I-SALA1
curso: Next.js
dia: 4 
estado: en_progreso
loom: https://drive.google.com/file/d/1egApIX4BhyY-xJBy0EOxPwmy1jeGqSLo/view?usp=sharing
---

## Bloques
- [X] A — getMesaById en api.ts + verificar con Postman
- [X] B — page.tsx con fetch real + generateMetadata + notFound()
- [X] C — MesaDetalle Client Component + Suspense manual
- [x] D — Server Action cambiarEstadoMesa + revalidatePath
- [x] E — Verificación TypeScript + flujo completo
- [x] F — Evaluación entre pares + Loom + PRs

## Verificación final
- [X] Clic en mesa → /mesa/[id] muestra datos reales
- [X] Pestaña del browser muestra "Mesa N — Restaurante"
- [X] Cambiar estado → la mesa en /mesas se actualiza
- [X] npx tsc --noEmit → 0 errores 
- [x] PR aprobado por sala par
