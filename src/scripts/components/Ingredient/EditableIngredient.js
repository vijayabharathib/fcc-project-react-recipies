import React from 'react';
import '../../../styles/css/Ingredient.css';

let EditableIngredient = (props) => {
  let input;
  const updateItem=(e)=>{
    e.preventDefault();
    if(input.value.trim()){
      props.onUpdateClick(input.value);
    }
  }

  return(<li className="c-ingredient__item">
      <form className="c-ingredient__update--form" onSubmit={updateItem}>
        <input
          type="text"
          defaultValue={props.name}
          ref={(node)=>{input=node}} className="c-ingredient__name--editable"
          autoFocus>
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
}

export default EditableIngredient;
