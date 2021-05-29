import React, { Component } from "react";
import "../App.css";
import { Form, Checkbox, Modal, Grid, Container, Message, Button } from "semantic-ui-react";
import ApiHandler from "../api";
import CustomButton from "./CustomButton";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: "",
        currentPassword: "",
        newPassword: ""
      },
      error: null,
      loading: false,
      modalOpen: false
    };
  }

  updateForm(key, e, value = null) {
    this.setState({
      form: {
        ...this.state.form,
        [key]: value || e.target.value,
      },
    });
  }

  validateForm() {
    if (!this.state.form.email || !/\S+@\S+\.\S+/.test(this.state.form.email)
        || this.state.form.email !== this.props.user.email) {
      this.setState({
        error: "Invalid email address",
      });
      return false;
    }
    if (!this.state.form.currentPassword && !this.state.form.newPassword) {
      this.setState({
        error: "Current Password and New Password should not be empty",
      });
      return false;
    }
    this.setState({
      error: null,
    });
    return true;
  }

  submit() {
    if (this.validateForm()) {
      this.setState({
          loading: true
      })
      const {
          email,
          currentPassword,
          newPassword
      } = this.state.form
      ApiHandler.post('users', 'users/change-password', {}, {
        email,
        currentPassword,
        newPassword
      }).then(() => {
        this.props.history.push("/login");
      }).catch((e) => {
          console.log(e)
          this.setState({
              loading: false,
              error: e.error
          })
      })
    }
  }

  formIsComplete() {
    for (let key of Object.keys(this.state.form)) {
      if (!this.state.form[key]) {
        return false;
      }
    }
    return true;
  }

  render() {
    
    const {
      modalOpen
    } = this.state

    return (
      <div className="change-password">

        <Modal closeIcon onClose={() => this.setState({ modalOpen: false })} open={modalOpen}
          trigger= { 
            <Button onClick={() => this.setState({ modalOpen: true })} 
              color="teal">
                Change Password
            </Button>
          }
        >
          <Modal.Header>
            Change Password
          </Modal.Header>
          <Modal.Content>

          <Grid>
            <Container className="change-password-container">
              {this.state.error ? (
                <Message negative>
                  <Message.Header>Change Password Error</Message.Header>
                  <p>{this.state.error}</p>
                </Message>
              ) : null}
              <Form className="change-password-form">
                <Form.Input
                  label="Email"
                  className="change-password-email"
                  placeholder="E-mail Address"
                  value={this.state.form.email}
                  onChange={(e) => this.updateForm("email", e)}
                />
                <Form.Input
                  label="Current Password"
                  className="change-password-current-password"
                  placeholder="Current Password"
                  value={this.state.form.currentPassword}
                  onChange={(e) => this.updateForm("currentPassword", e)}
                />
                <Form.Input
                  label="New Password"
                  className="change-password-new-password"
                  placeholder="New Password"
                  value={this.state.form.newPassword}
                  onChange={(e) => this.updateForm("newPassword", e)}
                />

                <Form.Button
                  color="teal"
                  className="change-password-button"
                  content="Change Password"
                  size="large"
                  onClick={this.submit.bind(this)}
                  disabled={!this.formIsComplete()}
                  loading={this.state.loading}
                />
              </Form>
            </Container>
          </Grid>

          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick= {() => {this.setState({ modalOpen: false })}}
              negative
            >
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>

        
      </div>
    )
  }
}

export default ChangePassword;
