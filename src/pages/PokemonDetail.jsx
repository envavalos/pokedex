import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PokemonDetail.css"; // O el nombre que tenga tu archivo CSS de detalles

export default function PokemonDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // NUEVO: Estado para alternar entre la versión normal y la versión Shiny
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon({
          name: data.name,
          id: data.id,
          // Guardamos las dos variantes oficiales directamente de la API
          imageNormal: data.sprites.other["official-artwork"].front_default,
          imageShiny: data.sprites.other["official-artwork"].front_shiny,
          types: data.types.map((t) => t.type.name),
          stats: data.stats.map((s) => ({
            name: s.stat.name.toUpperCase(),
            value: s.base_stat,
          })),
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <div className="loading-state">Cargando datos...</div>;
  if (!pokemon) return <div className="loading-state">Pokémon no encontrado</div>;

  return (
    <div className="detail-container">
      {/* Botón para regresar respetando la memoria de la caché */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Volver
      </button>

      <div className="pokemon-detail-card">
        <span className="detail-id">#{pokemon.id.toString().padStart(3, '0')}</span>
        
        {/* LA IMAGEN CAMBIA EN TIEMPO REAL: Dependiendo de si isShiny es true o false */}
        <div className="image-container">
          <img 
            src={isShiny ? pokemon.imageShiny : pokemon.imageNormal} 
            alt={pokemon.name} 
            className={`detail-pokemon-img ${isShiny ? "shiny-effect" : ""}`}
          />
        </div>

        {/* NUEVO: Botón de alternancia Shiny */}
        <button 
          className={`detail-shiny-btn ${isShiny ? "active" : ""}`}
          onClick={() => setIsShiny(!isShiny)}
        >
          {isShiny ? "✨ VER VERSIÓN NORMAL" : "✨ VER VERSIÓN SHINY"}
        </button>

        <h1 className="detail-name">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>

        <div className="detail-types">
          {pokemon.types.map((type) => (
            <span key={type} className={`type-badge ${type}`}>
              {type.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Sección de estadísticas base idéntica a la tuya */}
        <div className="stats-section">
          <h2>Estadísticas Base</h2>
          {pokemon.stats.map((stat) => (
            <div key={stat.name} className="stat-row">
              <span className="stat-name">{stat.name}</span>
              <div className="stat-bar-container">
                <div 
                  className="stat-bar-fill" 
                  style={{ width: `${Math.min((stat.value / 150) * 100, 100)}%` }}
                >
                  <span className="stat-value">{stat.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}