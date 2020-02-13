import React, { Component } from "react"
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
class Orders extends Component{

    state = {
        orders: [],
        loading:true
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders =[];
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }

                this.setState({loading:false,orders:fetchOrders});
            })
            .catch(err =>{
                this.setState({loading:false});
            });
    }

    deleteHandler = (id) =>{
       
        axios.delete('/orders.json/',{
            data: {id: id}
            })
            .then(res => {
                this.setState({loading:false});
            })
            .catch(err =>{
                this.setState({loading:false});
            });
    }
    render(){
        return (
            <div>
                {this.state.orders.map(order => (
                        <Order key={order.id} ingredients={order.ingredients} price={order.price} clicked={()=>this.deleteHandler(order.id)}/>
                ))}
            </div>
        );
    }
}

export default WithErrorHandler(Orders,axios);
