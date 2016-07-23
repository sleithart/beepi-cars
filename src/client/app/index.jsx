import React from 'react';
import {render} from 'react-dom';
import SearchBar from './SearchBar.jsx';
import PriceFilter from './PriceFilter.jsx';
import CarList from './CarList.jsx';


class App extends React.Component {
  render () {
    return (
        <div>
            <SearchBar />
            <PriceFilter />
            <CarList />
        </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
