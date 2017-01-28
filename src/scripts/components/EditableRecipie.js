import React, {PropTypes} from 'react';

let EditableRecipie = (props) => {
    let input;
    const updateItem=(e)=>{
      e.preventDefault();
      if(input.value.trim()){
        props.onUpdateClick(input.value);
      }
    }

    let collapsedClass="";
    collapsedClass=(props.collapsed ? "c-recipie--collapsed" : "");

    return (
      <li className={"c-recipie " + collapsedClass}>
        <form className="c-recipie__update--form" onSubmit={updateItem}>
          <input
            className="c-recipie__name--editable"
            type="text"
            defaultValue={props.name}
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

export default EditableRecipie;
