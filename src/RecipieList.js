import React, { Component } from 'react';
import Recipie from './Recipie';
class RecipieList extends Component{
  render(){
    let deleteItem=this.props.onDelete
    let recipies=this.props.recipies.map(function(recipie){
      return (
        <Recipie key={recipie.key} name={recipie.name} delete={deleteItem.bind(null,recipie.key)}/>
        /*<li className="c-recipie" key={recipie.key}>
          <h4 className="c-recipie__name">{recipie.name}</h4>
          <IngredientList ingredients={this.state.ingredients} />
          <button className="c-recipie__delete" onClick={deleteItem.bind(null,recipie.key)}>x</button>
          <button className="c-recipie__edit">Edit</button>
        </li>*/
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
