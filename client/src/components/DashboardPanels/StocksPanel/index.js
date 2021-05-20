import React, { Component } from "react";
import styles from "./styles.module.css";
import BasePanel from "../BasePanel";
import StockSearch from "../../StockSearch";

class StocksPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSearchBarSelect(result) {
    console.log(result);
  }

  render() {
    return (
      <BasePanel title="Find and Analyze Stocks">
        <div>
          <StockSearch id={styles.searchWrapper} onSelect={this.onSearchBarSelect.bind(this)} />
        </div>
      </BasePanel>
    );
  }
}

export default StocksPanel;
