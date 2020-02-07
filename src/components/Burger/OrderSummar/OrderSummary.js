import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

  componentDidUpdate(){
    console.log('[ordersummary] will update');
  }

  render(){

    const ingredients = Object.keys(this.props.ingredients)
                        .map(igkey=>{
                        return <li key={igkey+1}><span style={{textTransform:"capitalize"}}>{igkey} : </span>{this.props.ingredients[igkey]}</li>
                        });

    return(
      <Aux>
          <h3>Your Order</h3>
          <p>A delicious burger with the following ingredients</p>
          <ul>
            {ingredients}
          </ul>
          <p><strong>Total Price : {this.props.price}</strong></p>
          <p>Continue to Checkout ?</p>
          <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
          <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux> 
    );
  }
}

export default OrderSummary;