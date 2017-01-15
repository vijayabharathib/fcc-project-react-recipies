import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updateRecipie} from '../actions/ActionCreators';
import IngredientList from './IngredientList';

import '../../styles/css/Recipie.css';

let Recipie = ({recipie,dispatch}) => {

    let input;
    const updateItem=(e)=>{
      e.preventDefault();
      if(!input.value.trim()){
        return;
      }
      dispatch(updateRecipie(recipie.id,input.value));
    }

    let recipieHeader=(recipie)=>{
      let header;
      let ingredientList;
      if(!recipie.collapsed){
        ingredientList=<IngredientList recipie={recipie}></IngredientList>
      }
      if(recipie.editable){
        header=<li className="c-recipie">
          <form className="c-recipie__update--form" onSubmit={updateItem}>
            <input
              className="c-recipie__name--editable"
              type="text"
              defaultValue={recipie.name}
              ref={(node) => {input=node}}
              autoFocus="autofocus">
            </input>
            <label>
              <button className="c-recipie__update" type="submit">Update</button>
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
        header=<li className="c-recipie">
          <header>
            <h2 className="c-recipie__name" onClick={recipie.toggleIngredients}>{recipie.name}</h2>
            <svg
                    className="c-recipie__delete"
                    onClick={recipie.onDeleteClick}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 8 8">
                    <use xlinkHref="#trash"></use>
            </svg>
            <svg
              className="c-recipie__edit"
              onClick={recipie.onEditClick}
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
        editable: PropTypes.bool.isRequired,
        onEditClick: PropTypes.func.isRequired,
        onDeleteClick: PropTypes.func.isRequired,
        toggleIngredients: PropTypes.func.isRequired
      }
  ).isRequired
}

Recipie=connect()(Recipie);

export default Recipie;
