import React, { Component } from "react";
import "../../App.css";
import { Search } from "semantic-ui-react";
import BasePanel from "./BasePanel";

const results = [
  {
    name: "John",
    age: 14,
  },
  {
    name: "Mary",
    age: 92,
  },
];

class StocksPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
    };
  }

  render() {
    const resRender = () => <span key="name">Hello it works!</span>;
    return (
      <BasePanel title="Find and Analyze Stocks">
        <Search
          fluid
          icon="search"
          placeholder="Search Stocks..."
          results={results}
          onChange={(e) => this.updateForm("stock", e)}
          resultRenderer={resRender}
        />
      </BasePanel>
    );
  }
}

export default StocksPanel;
