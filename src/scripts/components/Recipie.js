import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {deleteRecipie, editRecipie, toggleIngredients} from '../actions/ActionCreators';

import '../../styles/css/Recipie.css';

let Recipie = (props) => {
    let recipie=props.recipie;
    let dispatch=props.dispatch;
    let onDeleteClick = () => dispatch(deleteRecipie(recipie.id));
    let onEditClick = () => dispatch(editRecipie(recipie.id));
    let onExpandClick = () => dispatch(toggleIngredients(recipie.id));
    let collapsedClass="";
    collapsedClass=(recipie.collapsed ? "c-recipie--collapsed" : "");

    return (
      <li className={"c-recipie " + collapsedClass}>
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
        {props.children}
      </li>
    );
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
