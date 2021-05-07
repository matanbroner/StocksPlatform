import React, { Component } from "react";
import styles from "./styles.module.css";
import BasePanel from "../BasePanel";
import SearchBar from "../../SearchBar";

import ApiHandler from "../../../api"

class StocksPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: {
        stockSearch: false
      },
      value: "",
    };
  }

  generateSearchBarResults(results){
    
  }

  async onSearchBarChange(query){
    const route = `stock/search?keyword=${query}`
    try {
      this.setState({
        loading: {
          ...this.state.loading,
          stockSearch: true
        }
      })
      const res = await ApiHandler.get(
        "data",
        route
      )
      console.log(res.data)
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({
        loading: {
          ...this.state.loading,
          stockSearch: false
        }
      })
    }
  }

  onSearchBarSelect(result){
    console.log(result)
  }

  render() {
    return (
      <BasePanel title="Find and Analyze Stocks">
        <SearchBar 
        loading={this.state.loading.stockSearch}
        results={this.state.results}
        onChange={this.onSearchBarChange.bind(this)}
        onSelect={this.onSearchBarSelect.bind(this)}
        />
      </BasePanel>
    );
  }
}

export default StocksPanel;
