import React, {PropTypes} from 'react';

let Recipie = (props) => {
    let collapsedClass="";
    collapsedClass=(props.collapsed ? "c-recipie--collapsed" : "");

    return (
      <li className={"c-recipie " + collapsedClass}>
        <header className="c-recipie__header">
          <h2 className="c-recipie__name" onClick={props.onExpandClick}>{props.name}</h2>
          <svg
            className="c-recipie__delete"
            onClick={props.onDeleteClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 8">
            <use xlinkHref="#trash"></use>
          </svg>
          <svg
            className="c-recipie__edit"
            onClick={props.onEditClick}
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
        name: PropTypes.string.isRequired,
        collapsed: PropTypes.bool.isRequired,
        onDeleteClick: PropTypes.func.isRequired,
        onEditClick: PropTypes.func.isRequired,
        onExpandClick: PropTypes.func.isRequired
}
export default Recipie;
