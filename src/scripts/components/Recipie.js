import React from 'react';

let Recipie = ({recipie}) => {
    return(
      <li className="c-recipie">
        <h4 className="c-recipie__name">{recipie.name}</h4>
        <button className="c-recipie__delete" onClick={recipie.onDeleteClick}>x</button>
        <button className="c-recipie__edit">Edit</button>
      </li>
    )
}

export default Recipie;
