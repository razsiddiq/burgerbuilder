import React , { Component } from 'react';


import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummar/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';


import Spinner from '../../components/UI/Spinner/Spinner';
const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    bacon:0.7,
    meat : 1.3
};

class BurgerBuilder extends Component {
   
    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error:false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-8b647.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients:response.data})
            })
            .catch(error=>{   
                this.setState({error:true})
              });
            
    }

    updatePurchaseState (updatedIngredients) {
   
        const sum = Object.keys(updatedIngredients)
                    .map(igKey=>{
                        return updatedIngredients[igKey]
                    })
                    .reduce((sum,el) => {
                        return sum + el;
                    },0);

        this.setState({purchasable: sum > 0})
    }

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

        // this.props.history.push('/checkout');
        const qureyParams = [];

        for (let i in this.state.ingredients){
            qureyParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        qureyParams.push('price='+this.state.totalPrice);
        const queryString = qureyParams.join('&');

        this.props.history.push({
            pathname : '/checkout',
            search : '?'+queryString
        });
    }


    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] =  disabledInfo[key] <= 0;
        }

        let orderSummary = null;
 

        
        let burger = this.state.error ? <p>Ingredeints cannot be loaded</p> :<Spinner/>
        if(this.state.ingredients){
            burger =(
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price = {this.state.totalPrice}
                        purchasable = {!this.state.purchasable}
                        ordered = {this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                                price = {this.state.totalPrice.toFixed(2)}
                                purchaseCanceled = {this.purchaseCancelHandler}
                                purchaseContinued = {this.purchaseContinueHandler}
                                ingredients={this.state.ingredients}/>;
        }
        
        if(this.state.loading){
            orderSummary=<Spinner/>
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

export default WithErrorHandler(BurgerBuilder,axios);