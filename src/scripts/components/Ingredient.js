import React from 'react';

let Ingredient = ({ingredient}) => {
  return(
    <li className="c-ingredient__item">
    <span className="c-ingredient__name">{ingredient.name}</span>
    <button className="c-ingredient__delete">x</button>
    <button className="c-ingredient__edit">Edit</button>
    </li>
  )
}

export default Ingredient;
