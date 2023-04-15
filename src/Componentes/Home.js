import { connect } from "react-redux";
import { selectAction } from "../redux/actions/selectactions";
import { useEffect } from "react";
import axios from "axios";

function Home(props) {

  const { dispatch } = props;
  const API = "https://pokeapi.co/api/v2/pokemon?limit=151";

  function array_chunk(arr, len) {
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
    axios.all(endPoints.map((endpoint) => axios.get(endpoint))).then((res) => dispatch(selectAction(array_chunk(res, 20))));
  }

  useEffect(() => {
    getPokemons(API);
  }, []);

  const ttt = () => {
    props.selectedColor[0].map((e) => {
      <div>
        <h2>{e.data.name}</h2>
      </div>
    });
  }

  return (
    <div>
      <h1>Teste</h1>
      {props.selectedColor[0] && props.selectedColor[0].map((e) => 
      <div>
        <img alt={e.data.name} src={Object.values(e.data.sprites.other)[2].front_default}/>
        <h2>{e.data.name}</h2>
        {e.data.types.map((e) => <h3>{e.type.name}</h3>)}
      </div>)}
    </div>
  );
}

const mapStateToProps = (store) => ({
    selectedColor: store.selectcolorreducer.selectedColor,
  });
  
  export default connect(mapStateToProps)(Home);