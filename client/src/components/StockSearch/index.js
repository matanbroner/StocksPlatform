import React, { Component, useState } from 'react';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
// import { Link } from 'react-router-dom';
import { Grid, Search } from 'semantic-ui-react';
import Navbar from '../Navbar/index';
import Topbar from '../Topbar/index';
import { debounce } from "lodash";
// import ApiHandler from "../../api";

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
    }
];

class StockSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: null,
            results: [],
            loading: false,
        };
    }

    // debounceEvent(...args) {
    //     this.debounceEvent = debounce(...args);
    //     return e => {
    //         e.persist();
    //         return this.debounceEvent(e);
    //     };
    // }

    // componentWillUnmount() {
    //     this.timer = null;
    // }

    handleSearch = debounce((e) => {
        let keyword = e.target.value;

        this.setState({search: keyword});
    }, 1000);


    render() {
        const resRender = () => (
            <div>
                {results.filter((val) => {
                    if (this.state.search == null) {
                        console.log(val);
                        return val;
                    } else if (val.company.toLowerCase().includes(this.state.search.toLowerCase()) || val.stock_name.toLowerCase().includes(this.state.search.toLowerCase())) {
                        console.log(this.state.search);
                        console.log(val);
                        return val;
                    }
                }).map((val, key) => {
                    return (
                        <div key={key}>
                            {val.company}
                        </div>
                    );
                })}
            </div>
        );
        
        return (
            <div>
                <Grid>
                    <Grid.Row className="stock-top">
                        <Grid.Column stretched width={16}>
                            <Topbar />
                        </Grid.Column>
                    </Grid.Row> 
                    <Grid.Row>
                        <Grid.Column stretched width={16}>
                        </Grid.Column>  
                    </Grid.Row>          
                    <Grid.Row>
                        <Grid.Column stretched width={16}>
                            <Navbar />
                        </Grid.Column>
                        <Grid.Column stretched width={16}>
                            <div className='stock-body'>
                                <div className='stock-title'>
                                    Stock Search
                                </div>
                                <div className='stock-search'>
                                    <Search
                                        fluid
                                        icon="search"
                                        placeholder="Search Stocks..."
                                        results={results}
                                        onChange={(e)=>this.handleSearch(e)}
                                        resultRenderer={resRender}
                                    />
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default StockSearch;