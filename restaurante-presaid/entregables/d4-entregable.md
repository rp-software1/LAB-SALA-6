# ENTREGABLE DÍA 4 - MVP RESTAURANTE END-TO-END

## 1. Evidencias del MVP

* **Screenshot Frontend:** `![Frontend MVP](ruta/o/url/de/la/imagen_frontend.png)` *(Platos, mesas y pedidos integrados consumiendo datos reales)*
* **Screenshot Swagger:** `![Swagger UI](ruta/o/url/de/la/imagen_swagger.png)` *(5 módulos documentados: Platos, Mesas, Pedidos, Comandas, Tickets)*
* **Enlace a Video Demo (Loom):** `[Insertar enlace de Loom aquí]`

---

## 2. Checklist F1-F7

- [x] **F1:** Módulo Platos funcionando y documentado en Swagger.
- [x] **F2:** Módulo Mesas funcionando con capacidad y estados.
- [x] **F3:** Módulo Pedidos relacionando correctamente Mesa y Platos.
- [x] **F4:** Módulo Comandas integrado para enviar pedidos a cocina.
- [x] **F5:** Módulo Tickets operativo para generación de cuenta/cobro.
- [x] **F6:** Frontend Next.js conectado correctamente al backend sin bloqueos de CORS.
- [x] **F7:** Flujo completo End-to-End ejecutado y verificado sin errores de integración.

---

## 3. Pruebas del Flujo Completo End-to-End

| Paso | Acción | Dónde verificar | Resultado Real |
| :--- | :--- | :--- | :--- |
| **1** | Crear platos (*Lomo Saltado*, *Ceviche*, *Ají de Gallina*) | Frontend: `/platos` o `POST /platos` | **Exitoso:** Platos persistidos en SQLite con ID y precio. |
| **2** | Crear mesas (*Mesa 1 cap 4*, *Mesa 2 cap 2*) | Frontend: `/mesas` o `POST /mesas` | **Exitoso:** Mesas creadas correctamente en BD. |
| **3** | Crear pedido (*Mesa 1*, platos: *[Lomo, Ceviche]*) | Frontend: `/pedidos` o `POST /pedidos` | **Exitoso:** Pedido creado asociando IDs de mesa y platos. |
| **4** | Ver pedido con relaciones cargadas | Frontend: `/pedidos` | **Exitoso:** Muestra nombre de la mesa y detalle de platos asociados. |
| **5** | Crear comanda del pedido | Postman: `POST /comandas` | **Exitoso:** Comanda generada vinculada al `pedidoId`. |
| **6** | Generar ticket de Mesa 1 | Postman: `POST /tickets` | **Exitoso:** Ticket generado calculando el total de la mesa. |

---

## 4. Predicciones vs. Resultado Real

* **Predicción 5 (CORS y Comunicación):**
  * *Predicción:* Se anticipó un bloqueo de comunicación entre Next.js (Frontend) y NestJS (Backend) por políticas de origen cruzado.
  * *Resultado Real:* Confirmado. Se solucionó configurando `app.enableCors()` en el archivo `main.ts` del backend.
* **Predicción 6 (Carga de Relaciones en Pedidos):**
  * *Predicción:* Al consultar un pedido, los objetos de mesa y platos no se mostrarían por defecto si no se especificaban explícitamente en la consulta del ORM.
  * *Resultado Real:* Confirmado. Se requirió incluir `{ relations: ['mesa', 'platos'] }` en las consultas TypeORM del servicio de pedidos.
* **Predicción 7 (Velocidad de Vibe Coding vs. Refactorización):**
  * *Predicción:* La IA generaría la interfaz rápidamente pero con decisiones de diseño autónomas que requerirían ajustes manuales.
  * *Resultado Real:* Confirmado. La UI se montó en tiempo récord, pero requirió ajustar componentes para adaptar la respuesta real de la API.

---

## 5. Aprendizajes del Día 4

* **Velocidad del vibe coding:** Construir 5 módulos backend más un frontend funcional en 4 días demuestra la aceleración de desarrollo asistido por IA.
* **Decisiones de UI con IA:** La IA toma decisiones estéticas autónomas cuando no hay especificaciones explícitas; definir un sistema de diseño inicial evita inconsistencias.
* **Integración End-to-End:** La prueba definitiva del software no es la ejecución aislada de módulos, sino la cohesión de las relaciones y el flujo de datos completo entre el cliente y el servidor.
* **Mantenibilidad (Semilla de SAID):** La repetición de patrones aceleró el desarrollo, pero abre la duda sobre la mantenibilidad del código a largo plazo si no se aplican estructuras arquitectónicas sólidas.