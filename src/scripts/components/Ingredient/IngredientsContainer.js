import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {addIngredient,deleteIngredient,editIngredient,updateIngredient} from '../../actions/ActionCreators';
import Ingredient from './Ingredient';
import EditableIngredient from './EditableIngredient';
import IngredientsList from './IngredientsList';
import AddIngredient from './AddIngredient';
import '../../../styles/css/IngredientList.css';

//container component with CRUD functions
let IngredientsContainer =(props)=> {
    let dispatch=props.dispatch;
    let onAddIngredient = (text) => {
      dispatch(addIngredient(props.recipie_id,text));
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
    return (
      <IngredientsList>
        <AddIngredient onAddIngredient={onAddIngredient} />
        {ingredientsList}
      </IngredientsList>
    );

}

IngredientsContainer.propTypes = {
  ingredients: PropTypes.array.isRequired
}

IngredientsContainer=connect()(IngredientsContainer);

export default IngredientsContainer;
