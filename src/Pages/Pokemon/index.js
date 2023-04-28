import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import "./pokemon.css";

const Pokemon = ({ pokemon }) => {
  const colours = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };
  return (
    <div className="page">
      {pokemon ? (
        <div className="info">
          <div className="image">
            <h1>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h1>
            <h2>{"#" + `00${pokemon.id}`.slice(-3)}</h2>
            <div>
              {pokemon.types.map((e) => (
                <h3
                  key={e.type.name}
                  style={{ background: colours[e.type.name] }}
                >
                  {e.type.name[0].toUpperCase() + e.type.name.substring(1)}
                </h3>
              ))}
            </div>
            <img
              alt={pokemon.name}
              src={Object.values(pokemon.sprites.other)[2].front_default}
            />
          </div>
          <div className="stats">
            <div className="gameStatus">
              <img
                className="firstchibi"
                alt={`${pokemon.name}-game_sprite`}
                src={pokemon.sprites.back_default}
              />
              <h2>Game Status</h2>
              <img
                className="secoundchibi"
                alt={`${pokemon.name}-game_sprite`}
                src={pokemon.sprites.front_default}
              />
            </div>
            <div className="numbers">
              {pokemon.stats.map((e) => {
                return (
                  <div key={e.stat.name}>
                    <h3>{`${
                      e.stat.name[0].toUpperCase() + e.stat.name.substring(1)
                    }`}</h3>
                    <div
                      className="skill"
                      style={{
                        border: `1px solid ${
                          colours[pokemon.types[0].type.name]
                        }`,
                      }}
                    >
                      <div
                        className="skill_level"
                        style={{
                          width: `${e.base_stat / 1.6}%`,
                          background: colours[pokemon.types[0].type.name],
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/" className="link">
              Back
            </Link>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

const mapStateToProps = (store) => ({
  pokemon: store.pokemonreducer.pokemon,
});

export default connect(mapStateToProps)(Pokemon);
