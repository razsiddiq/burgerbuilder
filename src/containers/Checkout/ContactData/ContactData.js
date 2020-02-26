import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';

import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state = {
        orderForm: {
            name : {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },           
            street : {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },
            ZipCode : {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation:{
                    required: true,
                    minLength : 5,
                    maxLength: 5
                },
                valid:false,
                touched:false
            },  
            country : {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },    
            email : {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },
            deliveryMethod : {
                elementType: 'select',
                elementConfig:{
                    options: [
                        {value:'fastest',displayValue: 'Fastest'},
                        {value:'cheapest',displayValue: 'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{
                },
                valid:true
            },
        },
        formIsValid : false,
        loading : false
    }

    checkValidity (value, rules) {
        let isValid = false;

        if(!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '';
        }

        if(rules.minLength){
            isValid = value.length >=rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <=rules.maxLength && isValid;
        }

        return isValid;
    }



    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}

        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients:this.props.ings,
            price:this.props.pri,
            orderData:formData
        }
       
        this.props.onOrderBurger(order);


    }

    inputChangedHandler = (event,inputIdentifier) =>{
        
        const updatedOrderform ={
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderform[inputIdentifier]
        }

        updatedFormElement.value=event.target.value;

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation );
        updatedFormElement.touched = true;
        updatedOrderform[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderform){
            formIsValid = updatedOrderform[inputIdentifier].valid && formIsValid;
        }


        this.setState({orderForm:updatedOrderform,formIsValid:formIsValid });

    }


    render(){


        const formElementsArray =[];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form =(<form  onSubmit={this.orderHandler}>
            { formElementsArray.map(formElement => {
                return <Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} inValid={!formElement.config.valid} touched={formElement.config.touched} shouldValidate={formElement.config.validation} changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
            })}
            <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
        </form>);

        if(this.props.loading){
            form= <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h1>Enter Your Contact Data</h1>
                {form}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{
        ings:state.burgerBuilder.ingredients,
        pri:state.burgerBuilder.totalPrice,
        loading:state.orders.loading
    }
}


const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));
