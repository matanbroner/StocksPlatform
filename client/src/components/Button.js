import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";


const buttonColors = ['button-teal', 'button-transparent'];
const buttonSizes = ['button--small', 'button--medium', 'button--large'];

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var buttonColor = buttonColors.includes(this.props.color) 
      ? this.props.color 
      : 'button-teal';

    var buttonSize = buttonSizes.includes(this.props.size) 
      ? this.props.size
      : 'button-small';
      
    return (
      <button 
        className={`button ${buttonColor} ${buttonSize}`}
        onClick={this.props.function}
      >
        {this.props.name}
      </button>
    )
  }
}

export default Button;
