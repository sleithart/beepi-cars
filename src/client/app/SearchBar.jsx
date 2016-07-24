import React from 'react';

var SearchBar = React.createClass({

  handleChange: function() {
    this.props.onUserInput(
      this.refs.searchTextInput.value
    );
  },

  render: function() {
    return (
      <div className='carSearch'>
        <input ref="searchTextInput" value={this.props.searchText} onChange={this.handleChange} placeholder='Filter by Make' />
      </div>
    );
  }
});

export default SearchBar;
