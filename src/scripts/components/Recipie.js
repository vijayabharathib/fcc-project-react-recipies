import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updateRecipie,deleteRecipie, editRecipie, toggleIngredients} from '../actions/ActionCreators';
import IngredientList from './IngredientList';

import '../../styles/css/Recipie.css';

let Recipie = ({recipie,dispatch}) => {
    let input;
    const updateItem=(e)=>{
      e.preventDefault();
      if(input.value.trim()){
        dispatch(updateRecipie(recipie.id,input.value));
      }
    }
    let onDeleteClick = () => dispatch(deleteRecipie(recipie.id));
    let onEditClick = () => dispatch(editRecipie(recipie.id));
    let onExpandClick = () => dispatch(toggleIngredients(recipie.id));

    let recipieHeader=(recipie)=>{
      let header;
      let ingredientList;
      let collapsedClass="";
      if(!recipie.collapsed){
        ingredientList=<IngredientList recipie={recipie}></IngredientList>;
      }else{
        collapsedClass="c-recipie--collapsed";
      }
      if(recipie.editable){
        header=<li className={"c-recipie " + collapsedClass}>
          <form className="c-recipie__update--form" onSubmit={updateItem}>
            <input
              className="c-recipie__name--editable"
              type="text"
              defaultValue={recipie.name}
              ref={(node) => {input=node}}
              autoFocus="autofocus">
            </input>
            <label>
              <button style={{display: "none"}} type="submit"></button>
              <svg
                className="c-recipie__update--check"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 8">
                <use xlinkHref="#circle-check" ></use>
              </svg>
            </label>
          </form>
          {ingredientList}
        </li>;
      }else{
        header=<li className={"c-recipie " + collapsedClass}>
          <header className="c-recipie__header">
            <h2 className="c-recipie__name" onClick={onExpandClick}>{recipie.name}</h2>
            <svg
                    className="c-recipie__delete"
                    onClick={onDeleteClick}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 8 8">
                    <use xlinkHref="#trash"></use>
            </svg>
            <svg
              className="c-recipie__edit"
              onClick={onEditClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 8">
              <use xlinkHref="#pencil"></use>
            </svg>
          </header>
          {ingredientList}
        </li>;
      }
      return header;
    }
    return(
        recipieHeader(recipie)
    )
}

Recipie.propTypes = {
  recipie: PropTypes.shape(
      {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        collapsed: PropTypes.bool.isRequired,
        editable: PropTypes.bool.isRequired
      }
  ).isRequired
}

Recipie=connect()(Recipie);

export default Recipie;
