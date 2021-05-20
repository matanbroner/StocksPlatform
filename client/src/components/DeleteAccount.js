import React, { Component } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import { Modal, Button, Checkbox } from "semantic-ui-react";
import CustomButton from "./CustomButton";
import ApiHandler from "../api";

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      checked: false
    };
  }

  deleteAccount() {
    console.log(this.props);
    const email = this.props.user.email;
    ApiHandler.delete('users', `users/delete-account/${email}`, {}, {})
    .then(() => {
        this.props.history.push("/login");
    }).catch((e) => {
        console.log(e)
    });
  }

  toggle = () => {
    this.setState((prevState) => ({ checked: !prevState.checked }))
  }

  render() {

    const {
      modalOpen
    } = this.state
    
    return (
      <div>
        <Modal closeIcon onClose={() => this.setState({ modalOpen: false })} open={modalOpen}
          size='tiny'
          trigger= { 
            <Button onClick={() => this.setState({ modalOpen: true })} 
              color="red">
                Delete Account
            </Button>
          }
        >
          <Modal.Header>
            Delete Account
          </Modal.Header>
          <Modal.Content>
            {/*<Checkbox 
              label='I agree that all my information will be lost'
              onChange={this.toggle}
              checked={this.state.checked}
            /> */}
            <p>
              <div>You'll lose all responses colleced by this typeform. 
                We can't recover them once you delete your account.
              </div>
              <div style={{paddingTop: "30px"}}>Are you sure you want to 
              <span style={{color: "red"}}> permanently delete</span> this typeform?</div>
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick= {() => this.setState({ modalOpen: false })}>
              Cancel
            </Button>
            <Button negative onClick= {() => {
              this.deleteAccount();
              this.setState({ modalOpen: true });
              }}
            >
              Yes, delete it
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default DeleteAccount;
