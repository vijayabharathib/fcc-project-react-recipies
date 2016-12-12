import React, { Component } from 'react';
import IngredientList from './Ingredients';
class RecipieList extends Component{
  constructor(){
    super();
    this.state={ ingredients: [{key: 1, name: "flour"},{key: 2, name: "salt"}]};
  }

  render(){
    let deleteItem=this.props.onDelete
    let recipies=this.props.recipies.map(function(recipie){
      return (
        <li className="c-recipie" key={recipie.key}>
          <h4 className="c-recipie__name">{recipie.name}</h4>
          <IngredientList ingredients={this.state.ingredients} />
          <button className="c-recipie__delete" onClick={deleteItem.bind(null,recipie.key)}>x</button>
          <button className="c-recipie__edit">Edit</button>
        </li>
      )
    })

    return(
      <ul>
        {recipies}
      </ul>
    )
  }
}

export default RecipieList;
