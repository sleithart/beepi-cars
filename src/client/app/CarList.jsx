import React from "react";

const data_url = "https://raw.githubusercontent.com/sleithart/beepi-cars/master/src/client/app/cars.json?token=ABDrhaU0w6hOOen1t4Kdm8_fPM5yGyFSks5XnDURwA%3D%3D"

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
      <div className='carList'>
        {carList}
      </div>
    );
  }

}

export default CarList;
