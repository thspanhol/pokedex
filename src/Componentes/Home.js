import { connect } from "react-redux";
import { selectAction } from "../redux/actions/selectactions";
import { useEffect } from "react";

function Home(props) {

  const { dispatch } = props;
  const api = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  function array_chunk(arr, len) {
    let chunks = [], i = 0, n = arr.length
    while (i < n) {
      chunks.push(arr.slice(i, i += len))
    }
    return chunks
  }

  const getPokemons = async (param) => {
    const response = await fetch(param);
    const data = await response.json();
    console.log(array_chunk(data.results.slice(0, 1273), 20));
    dispatch(selectAction(array_chunk(data.results.slice(0, 1273), 20)));
  };

  const getType = async (param) => {
    const response = await fetch(param);
    const data = await response.json();
    console.log(array_chunk(data.pokemon, 20));
    dispatch(selectAction(array_chunk(data.pokemon, 20)));
  };

  useEffect(() => {
    getPokemons(api);
  }, []);

  const filtro = (string) => {
  var numsStr = string.replace(/[^0-9]/g,'');
  return numsStr;
  };

  return (
    <div>
      <h1>Teste</h1>
      <h2>{props.selectedColor.length}</h2>
      <button onClick={() => getType('https://pokeapi.co/api/v2/type/10')}>Fire</button>
      {props.selectedColor.next && <button onClick={() => getPokemons(props.selectedColor.next)}>Próximos 20</button>}
      {props.selectedColor.previous && <button onClick={() => getPokemons(props.selectedColor.previous)}>20 Anteriores</button>}
      {props.selectedColor && props.selectedColor[1]
      .map((e) => 
        <div>
            <h1>{e.name || e.pokemon.name}</h1>
            <img alt={e.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${filtro(e.url || e.pokemon.url).substring(1)}.png`}/>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (store) => ({
    selectedColor: store.selectcolorreducer.selectedColor,
  });
  
  export default connect(mapStateToProps)(Home);