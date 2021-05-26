import React, { Component } from "react";
import styles from "./styles.module.css";
import BasePanel from "../BasePanel";
import StockSearch from "../../StockSearch";
import StockMetrics from "../../StockMetrics"

class StocksPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: null
    };
  }

  onSearchBarSelect(result) {
    this.setState({
      ticker: result.symbol
    })
  }

  render() {
    return (
      <BasePanel title="Find and Analyze Stocks">
        <div>
          <StockSearch id={styles.searchWrapper} onSelect={this.onSearchBarSelect.bind(this)} />
        </div>
        {
          this.state.ticker
          ? <StockMetrics ticker={this.state.ticker}/>
          : null
        }
      </BasePanel>
    );
  }
}

export default StocksPanel;
