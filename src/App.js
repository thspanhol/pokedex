import React from "react";
import Lista from "./Componentes/Lista";
import Selecionada from "./Componentes/Selecionada";
import Home from "./Componentes/Home";

class App extends React.Component {

  render(){
    return(
      <div>
       {/*  <Lista />
        <Selecionada /> */}
        <Home />
      </div>
    )
  }
}

export default App;
