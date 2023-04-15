const getPokemons = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/"
    );
    const data = await response.json();
    return data.data;
  };

const INITIAL_STATE = {
    name: '',
    email: '',
    data: getPokemons,
}

const userreducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default userreducer;