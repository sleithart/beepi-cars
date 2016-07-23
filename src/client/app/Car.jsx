import React from 'react';

class Car extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchParam: ''};
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div>
      </div>
    );
  }

}

export default Car;
