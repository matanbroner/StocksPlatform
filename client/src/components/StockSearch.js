import React, { Component } from 'react';
import '../App.css';
import 'semantic-ui-css/semantic.min.css';
// import { Link } from 'react-router-dom';
import Navbar from './Navbar';

class StockSearch extends Component {
    render() {
        return (
            <div>
                <Navbar />

                <div className='stock-body'>
                    <div className='stock-title'>
                        Stock Search
                    </div>
                </div>
            </div>
        )
    }
}

export default StockSearch;