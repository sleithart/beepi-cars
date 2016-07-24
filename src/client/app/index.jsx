import React from 'react';
import {render} from 'react-dom';
import SearchBar from './SearchBar.jsx';
import PriceFilter from './PriceFilter.jsx';
import CarList from './CarList.jsx';


var App = React.createClass({
    getInitialState: function() {
        return {
            searchText: '',
            priceBound: []
        };
    },
    handleType: function(searchText) {
        this.setState({
            searchText: searchText
        });
    },
    handlePriceChange: function(priceBound) {
        this.setState({
            priceBound: priceBound
        });
    },
    render: function() {
        return (
            <div>
                <SearchBar
                    searchText={this.state.searchText}
                    onUserInput={this.handleType}/>
                <PriceFilter
                    priceBound={this.state.priceBound}
                    onUserInput={this.handlePriceChange}/>
                <CarList
                    searchText={this.state.searchText}
                    priceBound={this.state.priceBound}/>
            </div>
        );
    }
});

render(<App/>, document.getElementById('app'));
