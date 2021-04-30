import React from "react";
import { Form, Modal, Button, Search } from "semantic-ui-react";

const ProjectCreateModal = (props) => {
  const resRender = () => <span key="name">Hello it works!</span>;
  return (
    <Modal onClose={() => props.onStateChange(false)} open={props.open}>
      <Modal.Header>Create a Project</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Initialize your project with an optional description and stocks to
            track.
          </p>
          <br></br>
        </Modal.Description>
        <Form>
          <Form.Field required>
            <label>Project Title</label>
            <input
              placeholder="Title"
              onChange={(e) => props.onFormUpdate("title", e)}
            />
          </Form.Field>
          <Form.TextArea
            label="Project Description"
            placeholder="Describe your project"
            onChange={(e) => props.onFormUpdate("description", e)}
          />
          <label className="stock-pick">Initial Stocks</label>
          <Search
            fluid
            icon="search"
            placeholder="Search Stocks..."
            results={[]}
            onChange={(e) => props.onFormUpdate("stock", e)}
            resultRenderer={resRender}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => props.onStateChange(false)}>Cancel</Button>
        <Button
          content="Create Project"
          labelPosition="left"
          icon="add"
          onClick={() => props.onSubmit()}
          positive
          loading={props.loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ProjectCreateModal;
