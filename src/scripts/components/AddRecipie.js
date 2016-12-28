import React from 'react';
import connect from 'react';
import addRecipie from '../actions/ActionCreators';


let AddRecipie = ({dispatch}) => {
  let input ;
  const addItem=(e) =>{
    e.preventDefault();
    if(!input.value.trim()){
      return;
    }
    dispatch(addRecipie(input.value));
    input.value='';
  }
  return (
    <form onSubmit={addItem.bind(this)}>
    <input
      type="text"
      className="c-recipie__control__textbox"
      ref={(node) => {input=node}}
    />
    <button type="submit" className="c-recipie__control__submit">Add Recipie</button>
    </form>
  )
}

AddRecipie=connect()(AddRecipie);

export default AddRecipie;
