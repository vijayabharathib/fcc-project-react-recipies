import React, { Component } from 'react';

class Ingredient extends Component{

  render(){
    let deleteItem=this.props.onDelete;
    return(
      <li className="c-ingredient" key={this.props.keyValue}>
      <span className="c-ingredient__name">{this.props.name}</span>
      <button className="c-ingredient__delete" onClick={deleteItem.bind(null,this.props.key)}>x</button>
      <button className="c-ingredient__edit">Edit</button>
      </li>
    )
  }
}

export default Ingredient;
