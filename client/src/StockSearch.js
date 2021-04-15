import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function StockSearch() {
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

export default StockSearch;