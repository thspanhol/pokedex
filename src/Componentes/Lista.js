import React from "react";
import { connect } from "react-redux";
import { selectAction } from "../redux/actions/selectactions";


class Lista extends React.Component {

  render(){
    const { colorList, dispatch } = this.props;

    const getPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/"
      );
      const data = await response.json();
      dispatch(selectAction(data))
    };


    return(
      <div>
        <p>Lista de Cores</p>
        <ul>
          {colorList.map((elem) => {
            return <li><button type="button" onClick={() => getPokemons()}>{elem}</button></li>;
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  colorList: store.selectcolorreducer.colorList,
});

// const mapDispatchToProps = (dispatch) => ({
//   selectedColor: (color) => dispatch(selectAction(color))
// });

export default connect(mapStateToProps)(Lista);
