import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import '../../styles/order.scss';

class Order extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            streetAddress: "",
            cityStateZip: "",
            restaurant: {},
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
        //TODO validate inputs before making fetch request
        const { streetAddress, cityStateZip } = this.state;
        this.setState({ hasErrors: false, errorMessage: "" });
        let address = `${streetAddress} ${cityStateZip}`.split(" ").join("+");
        let baseUrl = 'https://api.eatstreet.com/publicapi/v1/restaurant/search?method=delivery&street-address=';
        fetch(baseUrl + address,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Token': '2f6313388bf0a784' // replace with process.env.API_KEY when it works lol
                },

            }
        )
            .then(data => data.json())
            .then(response => {
                let index = Math.round(Math.random() * response.restaurants.length);
                this.setState({ restaurant: response.restaurants[index] });
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