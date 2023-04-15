
const INITIAL_STATE = {
    colorList: [
        'black', 'white', 'red', 'blue', 'green', 'yellow',
    ],
    selectedColor: '',
}

const selectcolorreducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SELECT_COLOR':
            return {
                ...state,
                selectedColor: action.color,
            }
        default:
            return state;
    }
}

export default selectcolorreducer;