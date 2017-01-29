import React from 'react';
//presentational component
//with header and
//addIngredient form passed as children
//and list of ingredients passed as children

let IngredientsList =(props)=> {
  //first element of children is AddIngredient
  //rest of them are ingredient lists
  return(
    <section className="o-ingredient__section">
      <header className="c-ingredient__header">
        <h3 className="c-ingredient__title">Ingredients</h3>
        {props.children.slice(0,1)}
      </header>
      <ul className="c-ingredient__list">
        {props.children.slice(1)}
      </ul>
    </section>
  )
}

export default IngredientsList;
