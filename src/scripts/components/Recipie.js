import React from 'react';

let Recipie = ({onDelete,name,collapsed}) => {
    return(
      <li className="c-recipie">
        <h4 className="c-recipie__name">{name}</h4>
        <button className="c-recipie__delete" onClick={onDelete}>x</button>
        <button className="c-recipie__edit">Edit</button>
      </li>
    )
}

export default Recipie;
