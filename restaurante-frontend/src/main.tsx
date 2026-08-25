import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PedidoProvider } from "./context/PedidoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PedidoProvider>
      <App />
    </PedidoProvider>
  </React.StrictMode>
);