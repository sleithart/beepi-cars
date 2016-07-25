import React from "react";

class Car extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchParam: ""};
  }

  render() {
    var carStyle = {
      backgroundImage: 'url(https:' + this.props.image + ')',
    };
    return (
      <div className='col-md-4'>
        <div style={carStyle} className='car'>
          <div className='basicInfo'>
            <span className='name'>{this.props.name}</span>
            {/* <span className='mileage'>{this.props.mileage}</span> */}
            <span className='price'>${this.props.price}</span>
          </div>
        </div>
      </div>
    );
  }

}

class CarList extends React.Component {
  render() {
    var carList = [];
    var re = new RegExp(this.props.searchText, 'gi');
    this.props.carList.forEach(car => {
      if (!car.name.match(re) || !(car.price >= this.props.priceBound.min && car.price <= this.props.priceBound.max)) {
        return;
      }
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
