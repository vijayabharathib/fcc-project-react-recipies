import React from 'react';
import {connect} from 'react-redux';
import {addRecipie} from '../../actions/ActionCreators';
import '../../../styles/css/AddRecipie.css';

let AddRecipie = ({dispatch}) => {
  let input ;
  const addItem=(e) =>{
    e.preventDefault();
    if(input.value.trim()){
      dispatch(addRecipie(input.value));
      input.value='';
    }
  }
  return (
    <div className="o-recipie__control" >
      <form onSubmit={addItem}>
      <input
        type="text"
        className="c-recipie__control__textbox"
        ref={(node) => {input=node}}
        placeholder="Add a recipie"
      />
    <button type="submit" className="c-recipie__control__submit">+</button>
      </form>
    </div>
  )
}

AddRecipie=connect()(AddRecipie);

export default AddRecipie;
