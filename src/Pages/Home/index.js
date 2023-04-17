import { connect } from "react-redux";
import { selectAction } from "../../redux/actions/selectactions";
import { useEffect } from "react";
import axios from "axios";
import Card from "../../Componentes/Card";

function Home(props) {

  const { dispatch } = props;
  const API = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const types = [{type: 'Normal', number: 1}, {type: 'Fighting', number: 2}, {type: 'Flying', number: 3}, {type: 'Poison', number: 4}, {type: 'Ground', number: 5}, {type: 'Rock', number: 6}, {type: 'Bug', number: 7}, {type: 'Ghost', number: 8}, {type: 'Steel', number: 9}, {type: 'Fire', number: 10}, {type: 'Water', number: 11}, {type: 'Grass', number: 12}, {type: 'Electric', number: 13}, {type: 'Psychic', number: 14}, {type: 'Ice', number: 15}, {type: 'Dragon', number: 16}, {type: 'Dark', number: 17}, {type: 'Fairy', number: 18}];

  const divideArray = (arr, len) => {
    let chunks = [], i = 0, n = arr.length
    while (i < n) {
      chunks.push(arr.slice(i, i += len))
    }
    return chunks
  }

  const filtro = (string) => {
    var numsStr = string.replace(/[^0-9]/g,'');
    return parseInt(numsStr.substring(1));
    };

  const getPokemons = async (endpoint) => {
    let results = [];
    await axios
    .get(endpoint)
    .then((res) => results = res.data.results || res.data.pokemon)
    .catch((err) => console.log(err));
    let endPoints = results.map((e) => e.url || e.pokemon.url);
    endPoints = endPoints.filter((e) => filtro(e) <= 151);
    axios.all(endPoints.map((endpoint) => axios.get(endpoint))).then((res) => dispatch(selectAction(divideArray(res, 20))));
  }

  useEffect(() => {
    getPokemons(API);
  }, []);

  return (
    <div>
      <h1>Teste</h1>
      {types.map((e) => <button onClick={() => getPokemons(`https://pokeapi.co/api/v2/type/${e.number}`)}>{e.type}</button>)}
      {props.selectedColor[0] && props.selectedColor[0].map((e) => <Card name={e.data.name} sprite={Object.values(e.data.sprites.other)[2].front_default} types={e.data.types} />)}
    </div>
  );
}

const mapStateToProps = (store) => ({
    selectedColor: store.selectcolorreducer.selectedColor,
  });
  
  export default connect(mapStateToProps)(Home);