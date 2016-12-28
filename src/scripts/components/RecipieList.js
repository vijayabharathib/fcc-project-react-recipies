import React, { Component } from 'react';
import Recipie from './Recipie';
class RecipieList extends Component{
  render(){
    let deleteItem=this.props.onDelete
    let recipies=this.props.recipies.map(function(recipie){
      return (
        <Recipie key={recipie.key} name={recipie.name} delete={deleteItem.bind(null,recipie.key)}/>
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
