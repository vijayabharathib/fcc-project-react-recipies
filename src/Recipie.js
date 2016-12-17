import React, { Component } from 'react';
import IngredientList from './Ingredients';
class Recipie extends Component{
  constructor(){
    super();
    this.state={ ingredients:[
      {key: 1, name: "flour"},
      {key: 2, name: "water"}
    ] };
  }

  render(){
    return(
      <li className="c-recipie">
        <h4 className="c-recipie__name">{this.props.name}</h4>
        <IngredientList ingredients={this.state.ingredients} />
        <button className="c-recipie__delete" onClick={this.props.delete}>x</button>
        <button className="c-recipie__edit">Edit</button>
      </li>
    )
  }
}

export default Recipie;
