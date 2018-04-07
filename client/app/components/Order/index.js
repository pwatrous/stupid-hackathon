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
            maxCost: 0
        };
    }
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

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
                    <Button className="submit-order" variant="raised" color="primary">Order</Button>
                </form>
            </div>
        );
    }
}

export default Order;