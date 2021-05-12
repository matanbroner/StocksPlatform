import React, { Component } from "react";
import styles from "./styles.module.css";
import BasePanel from "../BasePanel";
import Searchbar from "../Searchbar/index";

class StocksPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      value: "",
    };
  }

  render() {
    return (
      <BasePanel title="Find and Analyze Stocks">
        <Searchbar />
      </BasePanel>
    );
  }
}

export default StocksPanel;
