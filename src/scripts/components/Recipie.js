import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

let Recipie = ({recipie}) => {
    function recipieHeader(name,editable){
      let header;
      if(editable){
        header=<input type="text" defaultValue={name}></input>;
      }else{
        header=<h4 className="c-recipie__name">{name}</h4>;
      }
      return header;
    }
    return(
      <li className="c-recipie">
        {recipieHeader(recipie.name,recipie.editable)}
        <button className="c-recipie__delete" onClick={recipie.onDeleteClick}>x</button>
        <button className="c-recipie__edit" onClick={recipie.onEditClick}>Edit</button>
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

//Recipie=connect()(Recipie);
export default Recipie;
