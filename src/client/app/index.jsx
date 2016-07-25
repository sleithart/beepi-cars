import React from 'react';
import {render} from 'react-dom';
import SearchBar from './SearchBar.jsx';
import PriceFilter from './PriceFilter.jsx';
import CarList from './CarList.jsx';

// This is a placeholder, because I can't fetch a local file
const data_url = "https://raw.githubusercontent.com/sleithart/beepi-cars/master/src/client/app/cars.json?token=ABDrhaU0w6hOOen1t4Kdm8_fPM5yGyFSks5XnDURwA%3D%3D"

var App = React.createClass({
    minPrice: 0,
    maxPrice: 100000,

    componentWillMount: function() {
        fetch(data_url)
            .then(result => {
                return result.json()
            })
            .then(jsonResult => {
                this.setState({
                    cars : jsonResult,
                })
        });
    },
    getInitialState: function() {
        return {
            cars: [],
            searchText: localStorage.searchText || '',
            priceBound: {min: localStorage.min || this.minPrice, max: localStorage.max || this.maxPrice}
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

    carIsMatch: function(car) {
        var matchArray = [];
        var searchTextArray = this.state.searchText.split(' ');
        var re = new RegExp('(' + searchTextArray.join('|') + ')', 'i');

        var searchItems = [car.name, car.bodyType, car.mileage.toString(), car.year.toString()];
        searchItems.forEach(searchItem => {
            matchArray.push(re.test(searchItem));
        });
        return matchArray.some( match => { return match === true; } );
    },

    render: function() {
        var filteredCars = [];
        this.state.cars.forEach(car => {
            if (!this.carIsMatch(car) || !(car.price >= this.state.priceBound.min && car.price <= this.state.priceBound.max)) {
              return;
            }
            filteredCars.push(car);
        });
        return (
            <div>
                <SearchBar
                    searchText={this.state.searchText}
                    onUserInput={this.handleType}/>
                <PriceFilter
                    carList={filteredCars}
                    onUserInput={this.handlePriceChange} />
                <CarList carList={filteredCars} />
            </div>
        );
    }
});

render(<App/>, document.getElementById('app'));
