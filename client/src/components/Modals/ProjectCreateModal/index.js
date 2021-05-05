import React from "react";
import { Form, Modal, Button, Search } from "semantic-ui-react";

const results = [
  {
      company: "Disney",
      stock_name: "DIS",
      value: '$186.02'
  },
  {
      company: "Coca-Cola",
      stock_name: "KO",
      value: '$53.98'
  },
  {
      company: "Apple",
      stock_name: "AAPL",
      value: '$127.85'
  },
];

const ProjectCreateModal = (props) => {
  const resRender = () => (
    <div>
        {results.filter((val, key) => {
            if (this.state.search == null) {
                // console.log(val);
                return val;
            } else if (val.company.toLowerCase().includes(this.state.search.toLowerCase()) || val.stock_name.toLowerCase().includes(this.state.search.toLowerCase())) {
                console.log(this.state.search);
                // console.log(val);
                return val;
            }
        }).map((val, key) => {
            return (
                <div key={key}>
                  <div>
                    {val.company}
                  </div>
                  <div>
                    {val.stock_name}
                  </div>
                  <div>
                    {val.value}
                  </div>
                </div>
            );
        })}
    </div>
  );

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
            results={results}
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
