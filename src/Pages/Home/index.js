import { connect } from "react-redux";
import { setPokedex, setPokemon } from "../../redux/actions/selectactions";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Componentes/Card";
import './home.css'

function Home(props) {

  const { dispatch } = props;
  const limit = 251;
  const API = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  const [page, setPage] = useState([0,20]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('All');
  const types = [{type: 'Normal', number: 1, color: '#A8A77A'}, {type: 'Fighting', number: 2, color: '#C22E28'}, {type: 'Flying', number: 3, color: '#A98FF3'}, {type: 'Poison', number: 4, color: '#A33EA1'}, {type: 'Ground', number: 5, color: '#E2BF65'}, {type: 'Rock', number: 6, color: '#B6A136'}, {type: 'Bug', number: 7, color: '#A6B91A'}, {type: 'Ghost', number: 8, color: '#735797'}, {type: 'Steel', number: 9, color: '#B7B7CE'}, {type: 'Fire', number: 10, color: '#EE8130'}, {type: 'Water', number: 11, color: '#6390F0'}, {type: 'Grass', number: 12, color: '#7AC74C'}, {type: 'Electric', number: 13, color: '#F7D02C'}, {type: 'Psychic', number: 14, color: '#F95587'}, {type: 'Ice', number: 15, color: '#96D9D6'}, {type: 'Dragon', number: 16, color: '#6F35FC'}, {type: 'Dark', number: 17, color: '#705746'}, {type: 'Fairy', number: 18, color: '#D685AD'}];

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
    endPoints = endPoints.filter((e) => filtro(e) <= limit);
    axios.all(endPoints.map((endpoint) => axios.get(endpoint))).then((res) => dispatch(setPokedex(res)));
  }

  const selectPokemon = (param) => dispatch(setPokemon(param));

  const noPokemon = () => {
    if (props.pokedex && props.pokedex.slice(page[0],page[1]).filter((e) => e.data.name.startsWith(search.toLowerCase())).length === 0) {
      return <h1>Nenhum Pokemon Encontrado</h1>;
    }
  }

  const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  useEffect(() => {
    getPokemons(API);
  }, []);

  return (
    <div className="home">
      <div className="bar">
       
          <img alt="icon" src="./icon-pokebola.png" />
        <input type="text" value={search} onChange={(e) => {
          setSearch(e.target.value)
          if (e.target.value !== '') {
            setPage([0,160]);
          } else {
            setPage([0,20]);
          }
        }}/>
        <div>
          {types.map((e) => <button testcolor="pink" style={{background: sort === e.type ? e.color : '#777'}} key={`${e.type}-button`} onClick={() => {
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
        
        </div>
        
        
      </div>

<div className="pokedex">
  {props.pokedex ? (
        props.pokedex.slice(page[0],page[1]).map((e) => e.data.name.startsWith(search.toLowerCase()) && <Card key={e.data.name} name={e.data.name} sprite={Object.values(e.data.sprites.other)[2].front_default} selectPokemon={selectPokemon} pokemon={e.data} types={e.data.types} colours={colours} id={e.data.id} />)
      ) : (
        <h1>Loading</h1>
      )}
      {noPokemon()}
</div>
      

      <div className="skip"><button disabled={page[0] === 0} onClick={() => {
        if (page[0] >= 20) {
          setPage([page[0] -20, page[1] -20])
        }
      }}>{'<'}</button><button disabled={page[1] >= props.pokedex.length} onClick={() => {
        if (page[1] < props.pokedex.length) {
          setPage([page[0] +20, page[1] +20])
        }
      }}>{'>'}</button></div>
    </div>
  );
}

const mapStateToProps = (store) => ({
    pokedex: store.pokemonreducer.pokedex,
  });
  
  export default connect(mapStateToProps)(Home);