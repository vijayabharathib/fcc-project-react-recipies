import React, {PropTypes} from 'react';
import '../../styles/css/Ingredient.css';

let Ingredient = (props) => {
  return (<li className="c-ingredient__item">
      <span className="c-ingredient__name">{props.name}</span>
      <svg
        className="c-ingredient__delete"
        onClick={props.onDeleteClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 8 8">
        <use xlinkHref="#trash"></use>
      </svg>
      <svg
        className="c-ingredient__edit"
        onClick={props.onEditClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 8 8">
        <use xlinkHref="#pencil"></use>
      </svg>
    </li>);
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
}
export default Ingredient;
