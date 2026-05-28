import { Outlet } from "react-router-dom";
import "./PokedexAnimation.css"; // Comparte la carpeta layouts
import "../App.css";            // Sube a la carpeta src

export default function MainLayout() {
  return (
    <div className="main-layout">
      {/* Las dos compuertas rojas que hacen la animación de apertura */}
      <div className="pokedex-door door-top"></div>
      <div className="pokedex-door door-bottom"></div>

      {/* Encabezado fijo superior */}
      <header className="header">
        <h1>Pokedex</h1>
      </header>

      {/* Contenido dinámico (Home o Detalles) */}
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}