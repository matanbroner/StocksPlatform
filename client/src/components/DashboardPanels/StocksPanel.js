import React, { Component } from "react";
import "../../App.css";
import { Search } from "semantic-ui-react";
import BasePanel from "./BasePanel";
import _ from "lodash";

const list = [
  {
      company: "Disney",
      stock_name: "DIS",
      stock_value: '$186.02'
  },
  {
      company: "Coca-Cola",
      stock_name: "KO",
      stock_value: '$53.98'
  },
  {
      company: "Apple",
      stock_name: "AAPL",
      stock_value: '$127.85'
  },
];

const initialState = { isLoading: false, results: [], value: '' }

class StocksPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      value: "",
    };
  }

  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.company })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.company)

      this.setState({
        isLoading: false,
        results: _.filter(list, isMatch),
      })
    }, 300)
  }


  // componentWillMount() {
  //   this.resetComponent();
  // }

  // resetComponent = () => {
  //     this.setState({ loading: false, results: []});
  // };

  // handleResultSelect = (e, { result }) => this.setState({ value: result.company })

  // handleSearch = (e) => {
  //   let keyword = e.target.value;

  //   this.setState({loading: true});
  //   this.setState({search: keyword});
  // };

  render() {
    const { isLoading, value, results } = this.state
    const resRender = (data) => {
      debugger;
      return (
        <div>
          <div>
            { data.company }
          </div>
          <div>
            { data.stock_name}
          </div>
          <div>
            { data.stock_value }
          </div>
        </div>
      );
    }
    //   <div>
    //       {results.filter((val) => {
    //           if (this.state.search == null) {
    //               // console.log(val);
    //               return val;
    //           } else if (val.company.toLowerCase().includes(this.state.search.toLowerCase()) || val.stock_name.toLowerCase().includes(this.state.search.toLowerCase())) {

    //               // console.log(val);
    //               return val;
    //           }
    //       }).map((val, key) => {
    //           return (
    //               <div key={key}>
    //                 <div>
    //                   {val.company}
    //                 </div>
    //                 <div>
    //                   {val.stock_name}
    //                 </div>
    //                 <div>
    //                   {val.value}
    //                 </div>
    //               </div>
    //           );
    //       })}
    //   </div>
    // );
    return (
      <BasePanel title="Find and Analyze Stocks">
        <Search
          fluid
          icon="search"
          placeholder="Search Stocks..."
          loading={this.state.isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 1000, {
            leading: true,
          })}
          results={results}
          value={this.state.value}
          resultRenderer={resRender}
        />
      </BasePanel>
    );
  }
}

export default StocksPanel;
