import { connect } from "react-redux";

const Pokemon = ({pokemon}) => {
    return (
        <div>
            {pokemon ? (
                <div>
                  <h1>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h1>
                  <h2>{`#${pokemon.id}`}</h2>
                  <div>
                  {pokemon.types.map((e) => <h3>{e.type.name[0].toUpperCase() + e.type.name.substring(1)}</h3>)}
                  </div>
                  <img alt={pokemon.name} src={Object.values(pokemon.sprites.other)[2].front_default} />
                  <div>
                    <div>
                      <img alt={`${pokemon.name}-game_sprite`} src={pokemon.sprites.back_default} />
                      <h2>Game status</h2>
                      <img alt={`${pokemon.name}-game_sprite`} src={pokemon.sprites.front_default} />
                    </div>
                    
                    {pokemon.stats.map((e) => <h3>{`${e.stat.name[0].toUpperCase() + e.stat.name.substring(1)}: ${e.base_stat}`}</h3>)}
                  </div>
                </div>
            ) : (
                <div><h1>Loading</h1></div>
            )}
        </div>
    );
  }

  const mapStateToProps = (store) => ({
    pokemon: store.pokemonreducer.pokemon,
  });
  
  export default connect(mapStateToProps)(Pokemon);