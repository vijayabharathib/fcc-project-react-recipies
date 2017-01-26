import React, {PropTypes} from 'react';
import '../../styles/css/Ingredient.css';

let Ingredient = ({ingredient}) => {
  let element;
  let input;
  const updateItem=(e)=>{
    e.preventDefault();
    if(!input.value.trim()){
      return;
    }
    ingredient.onUpdateClick(input.value);
  }
  if(ingredient.editable){
    element= (<li className="c-ingredient__item">
      <form className="c-ingredient__update--form" onSubmit={updateItem}>
        <input
          type="text"
          defaultValue={ingredient.name}
          ref={(node)=>{input=node}} className="c-ingredient__name--editable">
        </input>
        <label>
          <button type="submit" style={{display: "none"}}></button>
          <svg
            className="c-ingredient__update--check"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 8">
            <use xlinkHref="#circle-check" ></use>
          </svg>
        </label>
    </form>
    </li>);
  }else{
    element=    (<li className="c-ingredient__item">
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
        onClick={ingredient.onEditClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 8 8">
        <use xlinkHref="#pencil"></use>
      </svg>
    </li>);
  }
  return(
    element
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired
}
export default Ingredient;
