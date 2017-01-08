import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updateRecipie} from '../actions/ActionCreators';
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

    let recipieHeader=(name,editable)=>{
      let header;
      if(editable){
        header=
          <form className="c-recipie__update--form" onSubmit={updateItem}>
            <input
              className="c-recipie__name--editable"
              type="text"
              defaultValue={name}
              ref={(node) => {input=node}}>
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
          </form>;
      }else{
        header=<h4 className="c-recipie__name">{name}</h4>;
      }
      return header;
    }
    return(
      <li className="c-recipie">
        {recipieHeader(recipie.name,recipie.editable)}
        <button className="c-recipie__delete" onClick={recipie.onDeleteClick}></button>
        <button className="c-recipie__edit" onClick={recipie.onEditClick}></button>
      </li>
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
        onDeleteClick: PropTypes.func.isRequired
      }
  ).isRequired
}

Recipie=connect()(Recipie);

export default Recipie;
