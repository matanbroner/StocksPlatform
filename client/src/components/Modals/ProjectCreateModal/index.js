import React from "react";
import styles from "./styles.module.css"
import { Form, Modal, Button, Label, Icon } from "semantic-ui-react";
import StockSearch from "../../StockSearch";

const ProjectCreateModal = (props) => {
  return (
    <Modal onClose={() => props.onStateChange(false)} open={props.open}>
      <Modal.Header>Create a Project</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Initialize your project with a description and stocks to
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
            required
            label="Project Description"
            placeholder="Describe your project"
            onChange={(e) => props.onFormUpdate("description", e)}
          />
          <label className="stock-pick">Add Stocks</label>
          <StockSearch onSelect={(v) => {
            props.onStockUpdate(v.symbol)
          }} />
        </Form>
        <div>
          {props.stocks.map((s) => (
            <Label className={styles.chosenTicker} key={s}>
              {s}
              <Icon onClick={() => props.onStockUpdate(s, true)} name="delete" />
            </Label>
          ))}
        </div>
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
