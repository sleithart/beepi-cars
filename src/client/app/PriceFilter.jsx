import React from 'react';

class PriceFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchParam: ''};
  }

  render() {
    return (
      <div>
        <input value={this.state.searchParam} />
      </div>
    );
  }

}

export default PriceFilter;
