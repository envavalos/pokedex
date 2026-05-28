import { createBrowserRouter } from "react-router-dom";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />, // El menú es la pantalla raíz al abrir la app
  },
  {
    path: "/pokedex",
    element: <Home />, // Tu Pokédex con los filtros de región
  },
  {
    path: "/pokemon/:name",
    element: <PokemonDetail />, // La pantalla de estadísticas base
  }
]);