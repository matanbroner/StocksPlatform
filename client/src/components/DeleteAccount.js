import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import Button from "./Button";
import ApiHandler from "../api";

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
  }

  deleteAccount() {
    const email = "b@yahoo.com";
    ApiHandler.delete('users', `users/delete-account/${email}`, {}, {})
    .then(() => {
        this.props.history.push("/login");
    }).catch((e) => {
        console.log(e)
    });
  }

  render() {
    
    return (
        <div className="delete-account">
            <h2>Delete Account</h2>
            <Button name="Delete Account" 
              color="button-teal" 
              size="button--medium" 
              function={() => this.deleteAccount()}
            />
        </div>
    )
  }
}

export default DeleteAccount;
