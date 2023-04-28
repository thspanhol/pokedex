import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ name, sprite, types, selectPokemon, pokemon, id }) => {
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
    <div className="card">
      <Link
        onClick={(e) => {
          selectPokemon(pokemon);
          let x = e.clientX;
          let y = e.clientY;
        }}
        to={`/${name}`}
      >
        <img alt={name} src={sprite} />
      </Link>
      <div className="name">
        <h2>{name[0].toUpperCase() + name.substring(1)}</h2>
        <h2>{"#" + `00${id}`.slice(-3)}</h2>
      </div>
      <div className="types">
        {types.map((e) => (
          <h3 style={{ background: colours[e.type.name] }} key={e.type.name}>
            {e.type.name[0].toUpperCase() + e.type.name.substring(1)}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default Card;
