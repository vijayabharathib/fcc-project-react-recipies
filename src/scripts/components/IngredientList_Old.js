import React, { Component } from 'react';
import Ingredient from './Ingredient';
class IngredientList extends Component{
  constructor(){
    super();
    this.state={
      ingredients: this.props.ingredients
    }
  }
  render(){
    let deleteItem=this.props.onDelete;
    let ingredients=this.state.ingredients.map(function(ingredient){
      return (
        <Ingredient name={ingredient.name} keyValue={ingredient.key} onDelete={deleteItem.bind(null)} />
      )
    })
    return(
      <div>
        <h5>Ingredients</h5>
        <button className="c-ingredient__add" onClick={this.props.addIngredient}>+</button>
        <ul>
          {ingredients}
        </ul>
      </div>
    )
  }
}

export default IngredientList;
