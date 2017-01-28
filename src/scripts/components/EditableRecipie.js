import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updateRecipie} from '../actions/ActionCreators';

import '../../styles/css/Recipie.css';

let EditableRecipie = (props) => {
    let recipie=props.recipie;
    let dispatch=props.dispatch;
    let input;
    const updateItem=(e)=>{
      e.preventDefault();
      if(input.value.trim()){
        dispatch(updateRecipie(recipie.id,input.value));
      }
    }

    let collapsedClass="";
    collapsedClass=(recipie.collapsed ? "c-recipie--collapsed" : "");

    return (
      <li className={"c-recipie " + collapsedClass}>
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
        {props.children}
      </li>
    );

}

EditableRecipie.propTypes = {
  recipie: PropTypes.shape(
      {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        collapsed: PropTypes.bool.isRequired,
        editable: PropTypes.bool.isRequired
      }
  ).isRequired
}

EditableRecipie=connect()(EditableRecipie);

export default EditableRecipie;
