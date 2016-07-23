import React from 'react';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchParam: ''};
    this.onChange = this.onChange.bind(this);
  }

  onChange () {
    // this.setState({searchParam: this.props.value + 'test'});
  }

  render() {
    return (
      <div className='carSearch'>
        <input value={this.state.searchParam} onChange={this.onChange} placeholder='Filter by Make' />
      </div>
    );
  }

}

export default SearchBar;
