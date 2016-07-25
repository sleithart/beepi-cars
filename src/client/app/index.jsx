import React from 'react';
import {render} from 'react-dom';
import SearchBar from './SearchBar.jsx';
import PriceFilter from './PriceFilter.jsx';
import CarList from './CarList.jsx';

// This is a placeholder, because I can't fetch a local file
const data_url = "https://raw.githubusercontent.com/sleithart/beepi-cars/master/src/client/app/cars.json?token=ABDrhaU0w6hOOen1t4Kdm8_fPM5yGyFSks5XnDURwA%3D%3D"

var App = React.createClass({
    componentDidMount: function() {
        fetch(data_url)
            .then(result => {
                return result.json()
            })
            .then(jsonResult => {
                this.setState({
                    cars : jsonResult
                })
        });
    },
    getInitialState: function() {
        return {
            cars: [],
            searchText: '',
            priceBound: {min: 0, max: 100000}
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
                    onUserInput={this.handlePriceChange}
                    carList={this.state.cars}/>
                <CarList
                    searchText={this.state.searchText}
                    priceBound={this.state.priceBound}
                    carList={this.state.cars}/>
            </div>
        );
    }
});

render(<App/>, document.getElementById('app'));
