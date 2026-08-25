import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// @ts-ignore
import "./index.css";
import { PedidoProvider } from "./context/PedidoContext";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <PedidoProvider>
        <App />
      </PedidoProvider>
    </React.StrictMode>
  );
}