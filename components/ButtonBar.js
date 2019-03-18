import PropTypes from "prop-types";
import React from "react";
import "./ButtonBar.scss";

const ButtonBar = props => {
  const childs = [];
  React.Children.forEach(props.children, (c, i) => {
    childs.push(
      <div key={`buttonElement${i}`} className="button-element">
        {c}
      </div>
    );
  });

  return <div className="button-bar">{childs}</div>;
};

ButtonBar.propTypes = {
  children: PropTypes.node.isRequired
};

export default ButtonBar;
