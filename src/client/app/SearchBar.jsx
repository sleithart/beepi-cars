import React from 'react';

var SearchBar = React.createClass({

  handleChange: function() {
    this.props.onUserInput(
      this.refs.searchTextInput.value
    );
    localStorage.setItem('searchText', this.refs.searchTextInput.value);
  },

  render: function() {
    var searchText = this.props.searchText || localStorage.searchText;
    return (
      <div className='carSearch'>
        <input ref="searchTextInput" value={searchText} onChange={this.handleChange} placeholder='Filter by Make, Year, Mileage, Body Type...' />
      </div>
    );
  }
});

export default SearchBar;
