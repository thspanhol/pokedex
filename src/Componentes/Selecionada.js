import React from "react";
import { connect } from "react-redux";

class Selecionada extends React.Component {

  render(){
    const { selectedColor } = this.props;
    return(
      <div>
        <p>Cor Selecionada: {selectedColor}</p>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  selectedColor: store.selectcolorreducer.selectedColor,
});

export default connect(mapStateToProps)(Selecionada);
