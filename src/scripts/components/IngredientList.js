import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {addIngredient} from '../actions/ActionCreators';

let IngredientList =({recipie,dispatch})=> {
    let input;
    const add=(e)=>{
      e.preventDefault();
      if(!input.value.trim()){
        return;
      }
      dispatch(addIngredient(recipie.id,input.value));
      input.value="";
    }
    return(
      <section className="c-ingredient">
        <header className="c-ingredient__header">
          <h3 className="c-ingredient__title">Ingredients</h3>
          <form className="c-ingredient__new__form" onSubmit={add}>
            <input
              type="text"
              className="c-ingredient__add--editable"
              ref={(node) => {input=node}}>
            </input>
            <button className="c-ingredient__add" type="submit">+</button>
          </form>
        </header>
      </section>
    )

}

IngredientList=connect()(IngredientList);

export default IngredientList;
