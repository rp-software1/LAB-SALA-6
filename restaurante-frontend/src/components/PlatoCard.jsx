function PlatoCard({ nombre, categoria, precio, stock, disponible }) {
    return (
        <div className={`plato-card ${!disponible ? "agotado" : ""}`}>
            <h2>{nombre}</h2>

            <p>
                <strong>Categoría:</strong> {categoria}
            </p>

            <p>
                <strong>Precio:</strong> S/ {precio}
            </p>

            <p>
                <strong>Stock:</strong> {stock}
            </p>

            <p>
                {disponible
                    ? "✅ Disponible"
                    : "❌ Agotado"}
            </p>
        </div>
    );
}

export default PlatoCard;