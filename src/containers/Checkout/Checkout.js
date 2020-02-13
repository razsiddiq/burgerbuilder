import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{

    state = {
        ingredients : null,
        price : 0
    }

    componentWillMount () { //before render the child component
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        let price=0;
        for(let param of query.entries()){
            if(param[0] !== 'price'){
                ingredients[param[0]] = +param[1];
            }else{
                price = +param[1];
            }    
        }

        this.setState({ingredients:ingredients,price:price});

    }

    onCheckoutCanceledHandler = () =>{
        this.props.history.goBack();
    }

    onCheckoutContinuedHanlder = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary
                onCheckoutCanceled = {this.onCheckoutCanceledHandler}
                onCheckoutContinued = {this.onCheckoutContinuedHanlder}
                ingredients={this.state.ingredients}
                />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                render={
                    (props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>
                } />
            </div>
        );
    }
}

export default Checkout;