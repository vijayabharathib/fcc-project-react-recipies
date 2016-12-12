import React, { Component } from 'react';

class Recipie extends Component {
  render(){
    return (
      <div className="c-recipie">
        <h2>{this.props.name}</h2>
        <ul>
          <Ingredient recipie={this.props.recipie} />
        </ul>
      </div>
    )
  }
}

class Ingredient extends Component {
  render(){
    return(
       <li>{this.props.recipie}</li>
    )
  }
}
export default Recipie;
