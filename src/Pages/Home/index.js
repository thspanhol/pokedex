import { connect } from "react-redux";
import { setPokedex, setPokemon } from "../../redux/actions/selectactions";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Componentes/Card";

function Home(props) {

  const { dispatch } = props;
  const API = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const [page, setPage] = useState([0,20]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('All');
  const types = [{type: 'Normal', number: 1}, {type: 'Fighting', number: 2}, {type: 'Flying', number: 3}, {type: 'Poison', number: 4}, {type: 'Ground', number: 5}, {type: 'Rock', number: 6}, {type: 'Bug', number: 7}, {type: 'Ghost', number: 8}, {type: 'Steel', number: 9}, {type: 'Fire', number: 10}, {type: 'Water', number: 11}, {type: 'Grass', number: 12}, {type: 'Electric', number: 13}, {type: 'Psychic', number: 14}, {type: 'Ice', number: 15}, {type: 'Dragon', number: 16}, {type: 'Dark', number: 17}, {type: 'Fairy', number: 18}];

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
    axios.all(endPoints.map((endpoint) => axios.get(endpoint))).then((res) => dispatch(setPokedex(res)));
  }

  const selectPokemon = (param) => dispatch(setPokemon(param));

  const noPokemon = () => {
    if (props.pokedex && props.pokedex.slice(page[0],page[1]).filter((e) => e.data.name.startsWith(search)).length === 0) {
      return <h1>Nenhum Pokemon Encontrado</h1>;
    }
  }


  useEffect(() => {
    getPokemons(API);
  }, []);



  return (
    <div>
      <div>
        <input type="text" value={search} onChange={(e) => {
          setSearch(e.target.value)
          if (e.target.value !== '') {
            setPage([0,160]);
          } else {
            setPage([0,20]);
          }
        }}/>
      </div>
      {types.map((e) => <button key={`${e.type}-button`} onClick={() => {
        if (sort === e.type) {
          getPokemons(API);
          setSort('All');
          setPage([0,20]);
        } else {
          getPokemons(`https://pokeapi.co/api/v2/type/${e.number}`);
          setSort(e.type);
          setPage([0,20]);
        }
      }}>{e.type}</button>)}

      {props.pokedex ? (
        props.pokedex.slice(page[0],page[1]).map((e) => e.data.name.startsWith(search.toLowerCase()) && <Card key={e.data.name} name={e.data.name} sprite={Object.values(e.data.sprites.other)[2].front_default} selectPokemon={selectPokemon} pokemon={e.data} types={e.data.types} />)
      ) : (
        <h1>Loading</h1>
      )}

      {/* {props.pokedex && props.pokedex.slice(page[0],page[1]).filter((e) => e.data.name.startsWith(search)).length === 0 && <h1>Nenhum Pokemon Encontrado</h1>} */}

      {noPokemon()}


      <div><button disabled={page[0] === 0} onClick={() => {
        if (page[0] >= 20) {
          setPage([page[0] -20, page[1] -20])
        }
      }}>{'<'}</button><button disabled={page[1] >= props.pokedex.length} onClick={() => {
        if (page[1] < props.pokedex.length) {
          setPage([page[0] +20, page[1] +20])
          console.log(props.pokedex.length);
        }
      }}>{'>'}</button></div>
    </div>
  );
}

const mapStateToProps = (store) => ({
    pokedex: store.pokemonreducer.pokedex,
  });
  
  export default connect(mapStateToProps)(Home);