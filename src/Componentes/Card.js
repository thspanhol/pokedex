import { Link } from "react-router-dom";
import './card.css'

const Card = ({name, sprite, types, selectPokemon, pokemon, colours, id}) => {
  return (
      <div className="card">
        <Link onClick={(e) => {
          selectPokemon(pokemon);
          let x = e.clientX;
          let y = e.clientY;
        }} to={`/${name}`}>
          <img alt={name} src={sprite} />
        </Link>
        <div className="name">
        <h2>{name[0].toUpperCase() + name.substring(1)}</h2>
        <h2>{'#'+`00${id}`.slice(-3)}</h2>
        </div>
        <div className="types">
          {types.map((e) => <h3 style={{background: colours[e.type.name]}} key={e.type.name}>{e.type.name[0].toUpperCase() + e.type.name.substring(1)}</h3>)}
        </div>
      </div>
  );
}

export default Card;
