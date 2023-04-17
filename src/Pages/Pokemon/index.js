import { connect } from "react-redux";

const Pokemon = (props) => {
    return (
        <div>
            {props.pokemon ? (
                <div><h1>{props.pokemon.name}</h1></div>
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