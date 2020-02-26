import * as actionTypes from '../actions/actionTypes';
import { updateObeject } from '../utility';

const initialState = {
    ingredients :null,
    totalPrice : 4,
    error : false
}

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    bacon:0.7,
    meat : 1.3
};

const addIngredients = (state, action) => {
    const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObeject(state.ingredients,updatedIngredient);  
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }             
        return updateObeject(state,updatedState);
}

const reducer = (state = initialState, action) => {
        switch(action.type){
            case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);         // swich case linear way   
            case actionTypes.REMOVE_INGREDIENT:                
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                    },
                    totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                }
            case actionTypes.SET_INGREDIENTS:                
                return {
                    ...state,
                    ingredients:{
                        salad : action.ingredients.salad,
                        bacon : action.ingredients.bacon,
                        cheese : action.ingredients.cheese,
                        meat : action.ingredients.meat,

                    },
                    totalPrice : initialState.totalPrice,
                    error:false
                }   
            case actionTypes.FETCH_INGREDIENTS_FAILED: 
                return updateObeject(state, {error:true});    //second argumnet pass object format          
 
            default:
                return state;    
        }
}

export default reducer;


