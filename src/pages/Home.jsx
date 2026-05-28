import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 

// Importamos la Pokéball de tu carpeta de assets
import pokeballLoading from "../assets/simple_pokeball.gif";

const REGIONES = [
  { nombre: "Kanto (Gen 1)", limit: 151, offset: 0 },
  { nombre: "Johto (Gen 2)", limit: 100, offset: 151 },
  { nombre: "Hoenn (Gen 3)", limit: 135, offset: 251 },
  { nombre: "Sinnoh (Gen 4)", limit: 107, offset: 386 },
  { nombre: "Unova (Gen 5)", limit: 156, offset: 493 },
];

const TIPOS = [
  "todos", "grass", "fire", "water", "bug", "normal", 
  "poison", "electric", "ground", "fairy", "fighting", 
  "psychic", "rock", "ghost", "ice", "dragon"
];

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShiny, setIsShiny] = useState(false);

  const [regionActiva, setRegionActiva] = useState(() => {
    const regionGuardada = localStorage.getItem("regionPokedex");
    return regionGuardada ? Number(regionGuardada) : 0;
  });

  const [tipoActivo, setTipoActivo] = useState("todos");

  useEffect(() => {
    setLoading(true);
    const { limit, offset } = REGIONES[regionActiva];
    localStorage.setItem("regionPokedex", regionActiva);

    const cacheKey = `cache_region_${regionActiva}`;
    const datosCacheados = localStorage.getItem(cacheKey);

    if (datosCacheados) {
      setTimeout(() => {
        setPokemons(JSON.parse(datosCacheados));
        setLoading(false);
      }, 1500); 
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then((res) => res.json())
        .then((data) => {
          const detallePromises = data.results.map((pokemon) => 
            fetch(pokemon.url).then((res) => res.json())
          );

          return Promise.all(detallePromises).then((resultadosDetallados) => {
            const results = resultadosDetallados.map((pokeDetalle, index) => {
              const idReal = offset + index + 1;
              return {
                name: pokeDetalle.name,
                id: idReal,
                imageNormal: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idReal}.png`,
                imageShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${idReal}.png`,
                types: pokeDetalle.types.map((t) => t.type.name)
              };
            });

            localStorage.setItem(cacheKey, JSON.stringify(results));
            
            setTimeout(() => {
              setPokemons(results);
              setLoading(false);
            }, 1500);
          });
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [regionActiva]); 

  const pokemonsFiltrados = tipoActivo === "todos" 
    ? pokemons 
    : pokemons.filter((pokemon) => pokemon.types.includes(tipoActivo));

  return (
    <div className="home-container">
      {/* Botón superior para regresar al menú launchpad */}
      <Link to="/" className="menu-back-link">⬅ Menú Principal</Link>

      <div className="selectors-container">
        <select 
          className="region-select" 
          value={regionActiva} 
          onChange={(e) => {
            setRegionActiva(Number(e.target.value));
            setTipoActivo("todos"); 
          }}
        >
          {REGIONES.map((reg, index) => (
            <option key={reg.nombre} value={index}>
              {reg.nombre}
            </option>
          ))}
        </select>

        <select 
          className={`type-select ${tipoActivo}`}
          value={tipoActivo} 
          onChange={(e) => setTipoActivo(e.target.value)}
        >
          {TIPOS.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo === "todos" ? "TODOS LOS TIPOS" : tipo.toUpperCase()}
            </option>
          ))}
        </select>

        <button 
          className={`shiny-toggle-btn ${isShiny ? "active" : ""}`}
          onClick={() => setIsShiny(!isShiny)}
        >
          {isShiny ? "✨ SHINY MODE ACTIVE ✨" : "✨ VER VERSIONES SHINY"}
        </button>
      </div>

      {loading ? (
        <div className="pokedex-loading-container">
          <img src={pokeballLoading} alt="Cargando..." className="pokeball-spinner" />
          <p>Sincronizando Pokédex...</p>
        </div>
      ) : pokemonsFiltrados.length === 0 ? (
        <div className="loading-state">
          No hay Pokémon de tipo {tipoActivo.toUpperCase()} en esta región.
        </div>
      ) : (
        <div className="pokemon-grid">
          {pokemonsFiltrados.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id} className="pokemon-card-link">
              <div className={`pokemon-card ${isShiny ? "shiny-card" : ""}`}>
                <span className="card-id">#{pokemon.id.toString().padStart(3, '0')}</span>
                <img 
                  src={isShiny ? pokemon.imageShiny : pokemon.imageNormal} 
                  alt={pokemon.name} 
                />
                <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}