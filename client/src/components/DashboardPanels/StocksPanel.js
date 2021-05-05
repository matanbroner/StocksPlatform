import React, { Component } from "react";
import "../../App.css";
import { Search } from "semantic-ui-react";
import BasePanel from "./BasePanel";
import _ from "lodash";

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

class StocksPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      results: [],
      loading: false,
      value: "",
    };
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => {
      this.setState({ loading: false, results: []});
  };

  handleResultSelect = (e, { result }) => this.setState({ value: result.company })

  handleSearch = (e) => {
    let keyword = e.target.value;

    this.setState({loading: true});
    this.setState({search: keyword});
  };

  render() {
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
      <BasePanel title="Find and Analyze Stocks">
        <Search
          fluid
          loading={this.state.loading}
          icon="search"
          placeholder="Search Stocks..."
          results={[]}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearch, 1000, {
            leading: true,
          })}
          resultRenderer={resRender}
        />
      </BasePanel>
    );
  }
}

export default StocksPanel;
