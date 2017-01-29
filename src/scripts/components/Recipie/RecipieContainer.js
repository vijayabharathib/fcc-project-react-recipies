import React from 'react';
import {connect} from 'react-redux';
import EditableRecipie from './EditableRecipie';
import Recipie from './Recipie';
import IngredientList from '../Ingredient/IngredientList';
import '../../../styles/css/Recipie.css';
import {updateRecipie,deleteRecipie, editRecipie, toggleIngredients} from '../../actions/ActionCreators';
let RecipieContainer = (props) => {
    let recipie=props.recipie;
    let dispatch=props.dispatch;
    let onUpdateClick=(text)=>{dispatch(updateRecipie(recipie.id,text))}
    let ingredientList;
    let recipieComponent;
    if(!recipie.collapsed){
      ingredientList=<IngredientList recipie_id={recipie.id} ingredients={recipie.ingredients} />;
    }
    if(recipie.editable){
      recipieComponent= (
        <EditableRecipie
          collapsed={recipie.collapsed}
          name={recipie.name}
          onUpdateClick={onUpdateClick} >

            {ingredientList}
        </EditableRecipie>
      );
    }else{
      let onDeleteClick = () => dispatch(deleteRecipie(recipie.id));
      let onEditClick = () => dispatch(editRecipie(recipie.id));
      let onExpandClick = () => dispatch(toggleIngredients(recipie.id));
      recipieComponent= (
        <Recipie
            collapsed={recipie.collapsed}
            name={recipie.name}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
            onExpandClick={onExpandClick}>

              {ingredientList}
        </Recipie>
      );
    }
    return <div>{recipieComponent}</div>;
}

RecipieContainer=connect()(RecipieContainer);

export default RecipieContainer;
