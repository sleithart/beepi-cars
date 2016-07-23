import React from "react";

const data_url = "https://raw.githubusercontent.com/sleithart/beepi-cars/master/src/client/app/cars.json?token=ABDrhaU0w6hOOen1t4Kdm8_fPM5yGyFSks5XnDURwA%3D%3D"

class Car extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchParam: ""};
  }

  render() {
    var carStyle = {
      background: 'url(https:' + this.props.image + ') no-repeat center center',
      backgroundSize: 'cover'
    };
    return (
      <div style={carStyle}>
        <span>{this.props.name}</span>
        <span>{this.props.mileage}</span>
        <span>{this.props.year}</span>
      </div>
    );
  }

}

class CarList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {cars: []};
  }

  componentDidMount() {
    fetch(data_url)
      .then(result => {
        return result.json()
      })
      .then(jsonResult => {
        this.setState({
          cars : jsonResult
        })
        console.log(this.state);
      });
  }

  render() {
    var carList = [];
    this.state.cars.forEach(car => {
      carList.push(<Car key={car.id} year={car.year} id={car.id} mileage={car.mileage} image={car.image} name={car.name} price={car.price} bodyType={car.bodyType}/>)
    });
    return (
      <div>
        {carList}
      </div>
    );
  }

}

export default CarList;
