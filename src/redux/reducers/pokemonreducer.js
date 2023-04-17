
const INITIAL_STATE = {
    pokedex: '',
    pokemon: '',
}

const pokemonreducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_POKEDEX':
            return {
                ...state,
                pokedex: action.pokedex,
            }
        case 'SET_POKEMON':
            return {
                ...state,
                pokemon: action.pokemon,
            }
        default:
            return state;
    }
}

export default pokemonreducer;