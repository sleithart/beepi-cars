import React from "react";

var Car = React.createClass ({

  getInitialState: function(props) {
    return {
      searchParam: "",
      hover: ""
    };
  },

  handleMouseOver: function() {
    this.setState({
      hover: "hover"
    });
  },

  handleMouseOut: function() {
    this.setState({
      hover: ""
    });
  },

  render: function() {
    var carStyle = {
      backgroundImage: 'url(https:' + this.props.image + ')',
    };
    var className = 'car ' + this.state.hover;
    return (
        <div style={carStyle} className={className} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <div className='basicInfo'>
            <span className='name'>{this.props.name}</span>
            <span className='price'>${this.props.price}</span>
            <div className='detailedInfo'>
              <span className='mileage'>{this.props.mileage}mi</span>
              <span className='year'>{this.props.year}</span>
              <span className='bodyType'>{this.props.bodyType}</span>
            </div>
          </div>
        </div>
    );
  }

});

class CarList extends React.Component {
  render() {
    var carList = [];
    this.props.carList.forEach(car => {
      carList.push(<Car key={car.id} year={car.year} id={car.id} mileage={car.mileage} image={car.image} name={car.name} price={car.price} bodyType={car.bodyType}/>)
    });
    return (
      <div className='carList'>
        {carList}
      </div>
    );
  }
}

export default CarList;
