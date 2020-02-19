import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from '../Checkout/ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{

  

   /* componentWillMount () { //before render the child component
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

    }*/

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
                ingredients={this.props.ings}
                />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData}
                // render={
                //     (props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>
                // } 
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings:state.ingredients
    }
}


export default connect(mapStateToProps)(Checkout);
