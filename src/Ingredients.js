import React, { Component } from 'react';

class IngredientList extends Component{

  render(){
    let deleteItem=this.props.onDelete;
    let ingredients=this.props.ingredients.map(function(ingredient){
      return (
        <li className="c-ingredient" key={ingredient.key}>
          <span className="c-ingredient__name">{ingredient.name}</span>
          <button className="c-ingredient__delete" onClick={deleteItem.bind(null,ingredient.key)}>x</button>
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
