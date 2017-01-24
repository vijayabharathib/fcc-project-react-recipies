import React, {PropTypes} from 'react';
import '../../styles/css/Ingredient.css';

let Ingredient = ({ingredient}) => {
  return(
    <li className="c-ingredient__item">
    <span className="c-ingredient__name">{ingredient.name}</span>
    <svg
      className="c-ingredient__delete"
      onClick={ingredient.onDeleteClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8">
      <use xlinkHref="#trash"></use>
    </svg>
    <svg
      className="c-ingredient__edit"
      onClick={()=>{}}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8">
      <use xlinkHref="#pencil"></use>
    </svg>
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired
}
export default Ingredient;
