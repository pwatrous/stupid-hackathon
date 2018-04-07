import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import '../../styles/order.scss';
require('dotenv').config();

class Order extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            streetAddress: "",
            cityStateZip: "",
            maxCost: 0,
            restaurants: [],
            hasErrors: false,
            errorMessage: ""
        };
    }
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        this.getRestaurants();
        // this.getMenu();
        // this.placeOrder();
    }

    getRestaurants = () => {
        const { streetAddress, cityStateZip } = this.state;
        this.setState({ hasErrors: false, errorMessage: "" });
        let address = `${streetAddress} ${cityStateZip}`.split(" ").join("+");
        let baseUrl = 'https://api.eatstreet.com/publicapi/v1/restaurant/search?method=delivery&street-address=';
        fetch(baseUrl + address,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Token': process.env.API_KEY
                },

            }
        )
            .then(data => data.json())
            .then(response => {
                console.log(response);
                // if (response.message === 'success') {
                //     //this.setState({})
                // } 
                // else {
                //     throw new Error("Couldn't fetch restaurants");
                // }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    hasErrors: true,
                    errorMessage: "Couldn't fetch restaurants"
                });
            });

    }

    render() {
        return (
            <div>
                <form className="order-form" noValidate autoComplete="off">
                    <TextField
                        required
                        id="streetAddress"
                        label="Street Address"
                        margin="normal"
                        onChange={this.handleChange('streetAddress')}
                    />
                    <TextField
                        required
                        id="cityStateZip"
                        label="City, State, Zip Code"
                        margin="normal"
                        onChange={this.handleChange('cityStateZip')}
                    />
                    <TextField
                        required
                        id="maxCost"
                        label="Max Cost"
                        margin="normal"
                        onChange={this.handleChange('maxCost')}
                    />
                    <Button 
                        className="submit-order" 
                        variant="raised"
                        color="primary"
                        onClick={this.handleSubmit}
                    >
                        Order
                    </Button>
                </form>
            </div>
        );
    }
}

export default Order;