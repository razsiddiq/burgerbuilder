import React , { Component } from 'react';

import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummar/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';


class BurgerBuilder extends Component {
   
    state = {
        purchasing : false,
    }

    componentDidMount(){        
            this.props.initIngredients();
    }

    updatePurchaseState (updatedIngredients) {
   
        const sum = Object.keys(updatedIngredients)
                    .map(igKey=>{
                        return updatedIngredients[igKey]
                    })
                    .reduce((sum,el) => {
                        return sum + el;
                    },0);

        return (sum > 0);
    }
    /*
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0 ){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }
    */
    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // this.setState({loading:true});
        // const order = {
        //     ingredients:this.state.ingredients,
        //     price:this.state.totalPrice,
        //     customer: {
        //         name : 'siddiq',
        //         address: {
        //             street : 'TestAstrett',
        //             country : 'india'
        //         },
        //         email :'test@test.com'
        //     },
        //     deliveryMethod : 'fastest'

        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading:false,purchasing:false})
        //     })
        //     .catch(error=> {
        //         this.setState({loading:false,purchasing:false});
        //     });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        // this.props.history.push('/checkout');
        /*const qureyParams = [];

        for (let i in this.state.ingredients){
            qureyParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        qureyParams.push('price='+this.state.totalPrice);
        const queryString = qureyParams.join('&');

        this.props.history.push({
            pathname : '/checkout',
            search : '?'+queryString
        });*/
    }


    render(){

        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] =  disabledInfo[key] <= 0;
        }

        let orderSummary = null;
 
        let burger = this.props.error ? <p>Ingredeints cannot be loaded</p> :<Spinner/>
        
        if(this.props.ings){
            console.log('error',burger);
            burger =(
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded = {this.props.addIngredient}
                        ingredientRemoved = {this.props.removeIngredient}
                        disabled={disabledInfo}
                        price = {this.props.pri}
                        purchasable = {!this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                                price = {this.props.pri.toFixed(2)}
                                purchaseCanceled = {this.purchaseCancelHandler}
                                purchaseContinued = {this.purchaseContinueHandler}
                                ingredients={this.props.ings}/>;
        }
  
        //it will return salad:true,bacon:false ....
        return(
            <Aux>
                
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}                
            </Aux>
        );
    }



}


const mapStateToProps = state => {
    return{
        ings:state.burgerBuilder.ingredients,
        pri:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addIngredient : (name) => dispatch(burgerBuilderActions.addIngredient(name)),
        removeIngredient : (name) => dispatch(burgerBuilderActions.removeIngredient(name)),
        initIngredients : () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase : () => dispatch(burgerBuilderActions.purchaseInit())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));