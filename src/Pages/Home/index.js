import { connect } from "react-redux";
import { setPokedex, setPokemon } from "../../redux/actions/selectactions";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Componentes/Card";
import "./home.css";

function Home(props) {
  const { dispatch } = props;
  const [fPage, setFPage] = useState(parseInt(sessionStorage.getItem("fpage")));
  const [lPage, setLPage] = useState(parseInt(sessionStorage.getItem("lpage")));
  const limit = 251;
  const API = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  const [search, setSearch] = useState(
    sessionStorage.getItem("searchPok") || ""
  );
  const [sort, setSort] = useState(sessionStorage.getItem("pokeType"));

  const types = [
    { type: "Normal", color: "#A8A77A" },
    { type: "Fighting", color: "#C22E28" },
    { type: "Flying", color: "#A98FF3" },
    { type: "Poison", color: "#A33EA1" },
    { type: "Ground", color: "#E2BF65" },
    { type: "Rock", color: "#B6A136" },
    { type: "Bug", color: "#A6B91A" },
    { type: "Ghost", color: "#735797" },
    { type: "Steel", color: "#B7B7CE" },
    { type: "Fire", color: "#EE8130" },
    { type: "Water", color: "#6390F0" },
    { type: "Grass", color: "#7AC74C" },
    { type: "Electric", color: "#F7D02C" },
    { type: "Psychic", color: "#F95587" },
    { type: "Ice", color: "#96D9D6" },
    { type: "Dragon", color: "#6F35FC" },
    { type: "Dark", color: "#705746" },
    { type: "Fairy", color: "#D685AD" },
  ];

  const definePage = (fpage, lpage) => {
    sessionStorage.setItem("fpage", fpage);
    sessionStorage.setItem("lpage", lpage);
    setFPage(parseInt(sessionStorage.getItem("fpage")));
    setLPage(parseInt(sessionStorage.getItem("lpage")));
  };

  const skipPage = (param) => {
    sessionStorage.setItem(
      "fpage",
      parseInt(sessionStorage.getItem("fpage")) + param
    );
    sessionStorage.setItem(
      "lpage",
      parseInt(sessionStorage.getItem("lpage")) + param
    );
    setFPage(parseInt(sessionStorage.getItem("fpage")));
    setLPage(parseInt(sessionStorage.getItem("lpage")));
  };

  const filter = (string) => {
    var numsStr = string.replace(/[^0-9]/g, "");
    return parseInt(numsStr.substring(1));
  };

  const getPokemons = async (endpoint) => {
    let results = [];
    await axios
      .get(endpoint)
      .then((res) => (results = res.data.results || res.data.pokemon))
      .catch((err) => console.log(err));
    let endPoints = results.map((e) => e.url || e.pokemon.url);
    endPoints = endPoints.filter((e) => filter(e) <= limit);
    axios
      .all(endPoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => dispatch(setPokedex(res)));
  };

  const selectPokemon = (param) => dispatch(setPokemon(param));

  const noPokemon = () => {
    if (
      props.pokedex &&
      props.pokedex.filter((e) => e.data.name.startsWith(search.toLowerCase()))
        .length === 0
    )
      return <h1>Nenhum Pokemon Encontrado</h1>;
  };

  if ((!fPage && !lPage) || (fPage === 0 && lPage === limit && search === ""))
    definePage(0, 20);

  useEffect(() => {
    if (sort && sort !== "All") {
      getPokemons(`https://pokeapi.co/api/v2/type/${sort.toLowerCase()}`);
    } else {
      getPokemons(API);
    }
  }, []);

  return (
    <div className="home">
      <div className="bar">
        <img
          alt="icon"
          src="https://raw.githubusercontent.com/thspanhol/pokedex/main/public/icon-pokebola.png"
        />
        <input
          type="text"
          spellCheck={false}
          placeholder="Search Pokemon for Name"
          value={search}
          onChange={(e) => {
            sessionStorage.setItem("searchPok", e.target.value);
            setSearch(sessionStorage.getItem("searchPok"));
            e.target.value === "" ? definePage(0, 20) : definePage(0, limit);
          }}
        />
        <div>
          {types.map((e) => (
            <button
              style={{ background: sort === e.type ? e.color : "#777" }}
              key={`${e.type}-button`}
              onClick={() => {
                if (sort === e.type) {
                  getPokemons(API);
                  sessionStorage.setItem("pokeType", "All");
                  setSort(sessionStorage.getItem("pokeType"));
                  definePage(0, limit);
                } else {
                  getPokemons(
                    `https://pokeapi.co/api/v2/type/${e.type.toLowerCase()}`
                  );
                  sessionStorage.setItem("pokeType", e.type);
                  setSort(sessionStorage.getItem("pokeType"));
                  definePage(0, limit);
                }
              }}
            >
              {e.type}
            </button>
          ))}
        </div>
      </div>
      <div className="pokedex">
        {props.pokedex ? (
          props.pokedex
            .slice(fPage, lPage)
            .map(
              (e) =>
                e.data.name.startsWith(search.toLowerCase()) && (
                  <Card
                    key={e.data.name}
                    name={e.data.name}
                    sprite={
                      Object.values(e.data.sprites.other)[2].front_default
                    }
                    selectPokemon={selectPokemon}
                    pokemon={e.data}
                    types={e.data.types}
                    id={e.data.id}
                  />
                )
            )
        ) : (
          <img
            alt="loading"
            src="https://raw.githubusercontent.com/thspanhol/pokedex/main/public/poke-loading.gif"
            className="loading"
          />
        )}
        {noPokemon()}
      </div>
      <div className="skip">
        <button disabled={fPage === 0} onClick={() => skipPage(-20)}>
          {"<"}
        </button>
        <button
          disabled={lPage >= props.pokedex.length}
          onClick={() => skipPage(+20)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  pokedex: store.pokemonreducer.pokedex,
});

export default connect(mapStateToProps)(Home);
