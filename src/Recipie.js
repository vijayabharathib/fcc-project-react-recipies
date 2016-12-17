import React, { Component } from 'react';
import IngredientList from './Ingredients';
class Recipie extends Component{
  constructor(){
    super();
    this.state={
      ingredients:[
        {key: 1, name: "flour"},
        {key: 2, name: "water"}
      ],
      displayIngredient: false
    };
  }

  toggleIngredient(){
    console.log('toggle');
    this.setState({displayIngredient: !this.state.displayIngredient});
  }

  addIngredient(){

  }

  deleteIngredient(deleteKey){
    let newIngredients=this.state.ingredients;
    newIngredients=this.state.ingredients.filter(function(ingredient){
      return ingredient.key!==deleteKey;
    });
    this.setState({ingredients: newIngredients});
  }
  render(){
    let ingList=null;
    if(this.state.displayIngredient){
      ingList=<IngredientList ingredients={this.state.ingredients} onDelete={this.deleteIngredient.bind(this)} />;
    }
    return(
      <li className="c-recipie">
        <h4 className="c-recipie__name" onClick={this.toggleIngredient.bind(this)}>{this.props.name}</h4>
        {ingList}
        <button className="c-recipie__delete" onClick={this.props.delete}>x</button>
        <button className="c-recipie__edit">Edit</button>
      </li>
    )
  }
}

export default Recipie;
