import React, { Component } from 'react';

class IngredientList extends Component{
  constructor(){
    super();
  }

  render(){
    let deleteItem=this.props.onDelete;
    let ingredients=this.props.ingredients.map(function(ingredient){
      return (
        <li className="c-ingredient" key={ingredient.key}>
          <span className="c-ingredient__name">{ingredient.name}</span>
          <button className="c-ingredient__delete">x</button>
          <button className="c-ingredient__edit">Edit</button>
        </li>
      )
    })

    return(
      <ul>
        {ingredients}
      </ul>
    )
  }
}

export default IngredientList;
