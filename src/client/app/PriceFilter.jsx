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
        return (<div className="carBar" style={carBarStyle}></div>);
    }
}

var PriceFilter = React.createClass ({
    minPrice: 0,
    maxPrice: 100000,
    gap: 1000,
    priceMultiplier: 7,

    shouldUseLocalStorage: function() {
        return localStorage.min && localStorage.max;
    },

    getLocalStorageValues: function() {
        return {
            min: parseInt(localStorage.min, 10),
            max: parseInt(localStorage.max, 10)
        }
    },

    componentWillMount: function() {
        if(this.shouldUseLocalStorage()) {
            this.setState({
                values: this.getLocalStorageValues()
            });
        }
    },

    componentWillReceiveProps: function(nextProps) {
        // We only want to do this on initial load
        if (this.props.carList.length || !nextProps.carList.length) {
            return;
        }

        var histogramCars = [],
            defaultValues = {min: this.maxPrice, max: this.minPrice};

        nextProps.carList.forEach(car => {
            histogramCars.push(car.price);
            defaultValues.min = car.price < defaultValues.min ? car.price : defaultValues.min;
            defaultValues.max = car.price > defaultValues.max ? car.price : defaultValues.max;
        });

        // Round to nearest thousands place
        defaultValues.min = Math.floor(defaultValues.min / 1000) * 1000;
        defaultValues.max = Math.ceil(defaultValues.max / 1000) * 1000;

        // local storage takes precedence over defaults
        if(this.shouldUseLocalStorage()) {
            defaultValues = this.getLocalStorageValues();
        }

        this.setState({
            histogramCars: histogramCars,
            values: defaultValues
        });

    },

    getInitialState: function() {
        return {
            histogramCars: [],
            values: {
              min: this.minPrice,
              max: this.maxPrice
            }
        };
    },

    handleChange: function(component, values) {
        var histogramCars = [];
        this.props.carList.forEach(car => {
            histogramCars.push(car.price);
        });
        this.setState({
            histogramCars: histogramCars,
            values: values
        });
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
            numCars = this.props.carList.filter(car => {
                return car.price <= i && car.price > i - 1000;
            });
            numCars = numCars.length || 0;
            histogram.push(<CarBar key={i} height={numCars*this.priceMultiplier} width={carWidth} left={carPosition} />);
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
