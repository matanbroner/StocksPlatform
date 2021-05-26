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
      <BasePanel 
        title="Find and Analyze Stocks"
        subtitle={`Here you can look up the stocks you want to get data on. Feel free to add them to your portfolio when you are ready. Happy hunting!`}
      >
        <div id={styles.searchWrapper}>
          <StockSearch onSelect={this.onSearchBarSelect.bind(this)} />
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
