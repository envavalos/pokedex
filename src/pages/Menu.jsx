import { Link } from "react-router-dom";
import "./Menu.css";

// Importamos tus imágenes locales desde la carpeta assets
import pokedexLogo from "../assets/pokemon-sword.webp";
import pokeballLogo from "../assets/images.png";

export default function Menu() {
  return (
    <div className="menu-launchpad-container">
      <header className="menu-header">
        <h1>POKÉ-APP</h1>
        <p>Selecciona una opción para comenzar</p>
      </header>

      <div className="menu-grid">
        {/* BOTÓN 1: Tu Pokédex con el logo de competición */}
        <Link to="/pokedex" className="menu-card-button">
          <div className="menu-icon-wrapper red-bg">
            <img 
              src={pokedexLogo} 
              alt="Logo Pokédex" 
              className="menu-local-media"
            />
          </div>
          <h2>Pokédex</h2>
          <p>Explora regiones, tipos y versiones Shiny</p>
        </Link>

        {/* BOTÓN 2: Pokédle con tu Pokéball HD */}
        <a 
          href="https://pokedle.net" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="menu-card-button"
        >
          <div className="menu-icon-wrapper green-bg">
            <img 
              src={pokeballLogo} 
              alt="Logo Pokédle" 
              className="menu-local-media rounded-fix"
            />
          </div>
          <h2>Pokédle</h2>
          <p>Adivina el Pokémon diario (Web Externa)</p>
        </a>
      </div>
    </div>
  );
}