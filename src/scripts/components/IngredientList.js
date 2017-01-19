import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {addIngredient} from '../actions/ActionCreators';
import Ingredient from './Ingredient';
import '../../styles/css/IngredientList.css';


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
    let ingredients=recipie.ingredients.map((ingredient) => {
      return (
        <Ingredient key={ingredient.id} ingredient={ingredient} />
      )
    });
    return(
      <section className="o-ingredient__section">
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
        <ul className="c-ingredient__list">
          {ingredients}
        </ul>
      </section>
    )

}

IngredientList=connect()(IngredientList);

export default IngredientList;
