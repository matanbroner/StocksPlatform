import React from "react";
import styles from "./styles.module.css";
import { Modal, Button } from "semantic-ui-react";
import ApiHandler from "../../../api";

const ProjectDeleteModal = (props) => {
  
  return (
    <Modal onClose={() => props.onStateChange(false)} open={props.open}>
      <Modal.Header>Delete a project</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Are you sure you want to delete project "{props.projectName}"?</p>
          <br></br>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => props.onStateChange(false)}>Cancel</Button>
        <Button
          content="Delete Project"
          labelPosition="left"
          icon="trash"
          onClick={() => props.onDelete()}
          negative
          disabled={props.loading}
          loading={props.loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ProjectDeleteModal;
