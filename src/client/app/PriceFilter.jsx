import React from 'react';
// from https://github.com/davidchin/react-input-range
import InputRange from 'react-input-range';

class CarBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var carBarStyle = {
            left: this.props.left + 'px',
            height: this.props.height + 'px',
            width: this.props.width + 'px'
        };
        return (
          <div className="carBar" style={carBarStyle}>
          </div>
        );
    }
}

var PriceFilter = React.createClass ({
    minPrice: 0,
    maxPrice: 100000,
    gap: 1000,

    componentDidUpdate: function() {
        // only do this if we haven't already done it
        if(this.state.histogramCars.length) {
            return;
        }
        var histogramCars = [],
            defaultValues = {min: this.maxPrice, max: this.minPrice};

        this.props.carList.forEach(car => {
            histogramCars.push(car.price);
            defaultValues.min = car.price < defaultValues.min ? car.price : defaultValues.min;
            defaultValues.max = car.price > defaultValues.max ? car.price : defaultValues.max;
        });

        if(localStorage.min && localStorage.max) {
            defaultValues = {
                min: parseInt(localStorage.min, 10),
                max: parseInt(localStorage.max, 10)
            };
        }

        this.setState({
            histogramCars: histogramCars,
            values: {
                min: defaultValues.min,
                max: defaultValues.max
            }
        });
    },

    getInitialState: function(props) {
        return {
            histogramCars: [],
            values: {
              min: this.minPrice,
              max: this.maxPrice
            }
        };
    },

    handleChange: function(component, values) {
        this.setState({
          values: values
        })
        this.props.onUserInput(
          values
        );
        localStorage.setItem('min', values.min);
        localStorage.setItem('max', values.max);
    },

    render: function() {
        var histogram = [],
            numCars = 0,
            carWidth = document.getElementById('app').offsetWidth / ( (this.maxPrice - this.minPrice) / 1000 ),
            carPosition = 0;
        for(var i=this.minPrice; i <= this.maxPrice; i += this.gap) {
            numCars = this.state.histogramCars.filter(car => {
                return car <= i && car > i - 1000;
            });
            numCars = numCars.length || 0;
            histogram.push(<CarBar key={i} height={numCars*5} width={carWidth} left={carPosition} />);
            carPosition += carWidth;
        }

        return (
            <div className='priceFilterWrapper'>
                <div className='histogram'>
                    {histogram}
                </div>
                <InputRange
                  maxValue={this.maxPrice}
                  minValue={this.minPrice}
                  value={this.state.values}
                  onChange={this.handleChange}
                  step={1000}
                />
            </div>
        );
    }

});

export default PriceFilter;
