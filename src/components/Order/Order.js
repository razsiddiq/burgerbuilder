import React from 'react';
import Button from '../UI/Button/Button';
import classes from './Order.css';
const order = (props) => {


        const Ingredients =[];

        for (let IngredientName in props.ingredients){
            Ingredients.push({
                name: IngredientName,
                amount: props.ingredients[IngredientName]
            })
        }

        const IngredientOutput = Ingredients.map(ig=>{
            return <span style={{textTransform:'capitalize',display:'inline-block',margin:'0 8px',padding:'5px',border: '1px solid #ccc'}} key={ig.name}>{ig.name} ({ig.amount})</span>;
        })

        return (<div className={classes.Order}>
            <p>Ingredients : {IngredientOutput}</p>
            <p>Price : USD {Number.parseFloat(props.price).toFixed(2)}</p>
            <Button btnType="Danger" clicked={props.clicked}>Delete</Button>
        </div>);
}

export default order;