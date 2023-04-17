import { Link } from "react-router-dom";

const Card = ({name, sprite, types, selectPokemon, pokemon}) => {
  return (
      <div>
        <Link onClick={() => selectPokemon(pokemon)} to={`/${name}`}>
          <img alt={name} src={sprite}/>
        </Link>
        <h2>{name[0].toUpperCase() + name.substring(1)}</h2>
        {types.map((e) => <h3>{e.type.name[0].toUpperCase() + e.type.name.substring(1)}</h3>)}
      </div>
  );
}

export default Card;
