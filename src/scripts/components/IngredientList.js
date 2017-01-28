import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {addIngredient,deleteIngredient,editIngredient,updateIngredient} from '../actions/ActionCreators';
import Ingredient from './Ingredient';
import EditableIngredient from './EditableIngredient';
import '../../styles/css/IngredientList.css';

let IngredientList =(props)=> {
    let dispatch=props.dispatch;
    let input;
    const add=(e)=>{
      e.preventDefault();
      if(input.value.trim()){
        dispatch(addIngredient(props.recipie_id,input.value));
        input.value="";
      }
    }
    let ingredientsList=props.ingredients.map((ingredient) => {
      let onDeleteClick = () => dispatch(deleteIngredient(props.recipie_id,ingredient.id));
      let onEditClick = () => dispatch(editIngredient(props.recipie_id,ingredient.id));
      let onUpdateClick =(text) => dispatch(updateIngredient(props.recipie_id,ingredient.id,text));
      let ingredientObject=Object.assign(
        {},ingredient,{onDeleteClick,onEditClick,onUpdateClick}
      );

      if(ingredient.editable){
        return <EditableIngredient key={ingredient.id} name={ingredient.name} onUpdateClick={onUpdateClick} />
      }else{
        return (<Ingredient
          key={ingredient.id}
          ingredient={ingredientObject}
          name={ingredient.name}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
          />
        );
      }
    });
    return(
      <section className="o-ingredient__section">
        <header className="c-ingredient__header">
          <h3 className="c-ingredient__title">Ingredients</h3>
          <div className="c-add__ingredient">
          <form className="c-ingredient__new__form" onSubmit={add}>
            <input
              type="text"
              className="c-ingredient__add--editable"
              ref={(node) => {input=node}}>
            </input>
            <button className="c-ingredient__add" type="submit">+</button>
          </form></div>
        </header>
        <ul className="c-ingredient__list">
          {ingredientsList}
        </ul>
      </section>
    )

}

IngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired
}

IngredientList=connect()(IngredientList);

export default IngredientList;
