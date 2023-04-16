import { connect } from "react-redux";
import { selectAction } from "../../redux/actions/selectactions";
import { useEffect } from "react";
import axios from "axios";
import Card from "../../Componentes/Card";

function Home(props) {

  const { dispatch } = props;
  const API = "https://pokeapi.co/api/v2/pokemon?limit=151";

  const divideArray = (arr, len) => {
    let chunks = [], i = 0, n = arr.length
    while (i < n) {
      chunks.push(arr.slice(i, i += len))
    }
    return chunks
  }

  const getType = async (param) => {
  };

  const getPokemons = async (param) => {
    let results = [];
    await axios
    .get(param)
    .then((res) => results = res.data.results)
    .catch((err) => console.log(err));
    const endPoints = results.map((e) => e.url);
    axios.all(endPoints.map((endpoint) => axios.get(endpoint))).then((res) => dispatch(selectAction(divideArray(res, 20))));
  }

  useEffect(() => {
    getPokemons(API);
  }, []);

  return (
    <div>
      <h1>Teste</h1>
      {props.selectedColor[0] && props.selectedColor[0].map((e) => <Card name={e.data.name} sprite={Object.values(e.data.sprites.other)[2].front_default} types={e.data.types} />)}
    </div>
  );
}

const mapStateToProps = (store) => ({
    selectedColor: store.selectcolorreducer.selectedColor,
  });
  
  export default connect(mapStateToProps)(Home);