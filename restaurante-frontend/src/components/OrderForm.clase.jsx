// components/OrderForm.clase.jsx
// VERSIÓN LEGACY — componente de clase
// NO modificar este archivo — es la referencia para la migración
import React from "react";

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    // El estado del formulario vive aquí
    this.state = {
      mesa:     "",
      plato:    "",
      cantidad: 1,
      enviando: false,
      mensaje:  "",
    };
    // Bind necesario para que "this" funcione en los handlers
    this.handleSubmit  = this.handleSubmit.bind(this);
    this.handleChange  = this.handleChange.bind(this);
  }

  // Se ejecuta una sola vez cuando el componente aparece en pantalla
  componentDidMount() {
    console.log("OrderForm montado — mesa disponible:", this.props.mesaNumero);
  }

  // Maneja cualquier cambio en los inputs del formulario
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Maneja el envío del formulario
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ enviando: true, mensaje: "" });

    // Simula envío a la API (async/await del Sprint 0)
    setTimeout(() => {
      this.setState({
        enviando: false,
        mensaje:  `Comanda enviada: ${this.state.plato} x${this.state.cantidad}`,
        plato:    "",
        cantidad: 1,
      });
    }, 1500);
  }

  render() {
    const { mesa, plato, cantidad, enviando, mensaje } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Comanda — Mesa {this.props.mesaNumero}</h2>

        <input
          name="plato"
          value={plato}
          onChange={this.handleChange}
          placeholder="Nombre del plato"
        />

        <input
          type="number"
          name="cantidad"
          value={cantidad}
          onChange={this.handleChange}
          min="1"
        />

        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Agregar a comanda"}
        </button>

        {mensaje && <p>{mensaje}</p>}
      </form>
    );
  }
}

export default OrderForm;