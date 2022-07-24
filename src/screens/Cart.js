import React,{Component} from 'react'
import { connect } from "react-redux";
import {ApolloClient,InMemoryCache,ApolloProvider,useQuery,gql} from "@apollo/client";
import { increment, decrement } from "../slice/counterSlice"
import {removeFromCart,incrementQuantity,decrementQuantity,changeCurrency} from "../slice/cart"
import { Link,withRouter } from 'react-router-dom'


class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {data: [],item:{},total:0};
    }
    //calculating total based on currency
    componentDidMount() {
        console.log(this.props.currency)
   
       if(this.props.currency.currency == "USD"){
        const grandTotal = this.props.cart.length === 0 ? 0 :
        this.props.cart
            .map(item => item.price ? item?.price[0]?.amount * item.quantity : 0)
            .reduce((itemPrice, accPrice) => accPrice + itemPrice);

            this.setState({total:grandTotal})
       }else if(this.props.currency.currency == "GBP"){
        const grandTotal = this.props.cart.length === 0 ? 0 :
        this.props.cart
            .map(item => item.price ? item?.price[1]?.amount * item.quantity : 0)
            .reduce((itemPrice, accPrice) => accPrice + itemPrice);

            this.setState({total:grandTotal})

       }else if(this.props.currency.currency == "AUD"){
        const grandTotal = this.props.cart.length === 0 ? 0 :
        this.props.cart
            .map(item => item.price ? item?.price[2]?.amount * item.quantity : 0)
            .reduce((itemPrice, accPrice) => accPrice + itemPrice);

            this.setState({total:grandTotal})

       }else if(this.props.currency.currency == "JPY"){
        const grandTotal = this.props.cart.length === 0 ? 0 :
        this.props.cart
            .map(item => item.price ? item?.price[3]?.amount * item.quantity : 0)
            .reduce((itemPrice, accPrice) => accPrice + itemPrice);

            this.setState({total:grandTotal})

      }else{
        const grandTotal = this.props.cart.length === 0 ? 0 :
        this.props.cart
            .map(item => item.price ? item?.price[4]?.amount * item.quantity : 0)
            .reduce((itemPrice, accPrice) => accPrice + itemPrice);

            this.setState({total:grandTotal})
        
      }
    }
    
    
       

   render(){
    
    //pick a currency
    const curr = (currency)=>{
        this.props.changeCurrency({currency:currency})
        
    }
     
    //remove from cart taking into account currency
    const remove = (e)=>{
         this.props.removeFromCart({id:e.id})
         if(this.props.currency.currency == "USD"){
            this.setState({total:this.state.total - e.price[0].amount})
         }else if(this.props.currency.currency == "GBP"){
            this.setState({total:this.state.total - e.price[1].amount})
            }else if(this.props.currency.currency == "AUD"){
                this.setState({total:this.state.total - e.price[2].amount})
            }else if(this.props.currency.currency == "JPY"){
                this.setState({total:this.state.total - e.price[3].amount})
            }else{
                this.setState({total:this.state.total - e.price[4].amount})
            }
         
    }
    //adding from cart based on currency
    const add = (e)=>{
        this.props.incrementQuantity({id:e.id})
        if(this.props.currency.currency == "USD"){
        this.setState({total:this.state.total + e.price[0].amount})
        }else if(this.props.currency.currency == "GBP"){
            this.setState({total:this.state.total + e.price[1].amount})
        }else if(this.props.currency.currency == "AUD"){
            this.setState({total:this.state.total + e.price[2].amount})
        }else if(this.props.currency.currency == "JPY"){
            this.setState({total:this.state.total + e.price[3].amount})
        }else{
            this.setState({total:this.state.total + e.price[4].amount})
        }
   }

   //remove from cart based on currency
   const subtract = (e)=>{
    this.props.decrementQuantity({id:e.id})
    
    if(this.props.currency.currency == "USD"){
        this.setState({total:this.state.total - e.price[0].amount})
     }else if(this.props.currency.currency == "GBP"){
        this.setState({total:this.state.total - e.price[1].amount})
        }else if(this.props.currency.currency == "AUD"){
            this.setState({total:this.state.total - e.price[2].amount})
        }else if(this.props.currency.currency == "JPY"){
            this.setState({total:this.state.total - e.price[3].amount})
        }else{
            this.setState({total:this.state.total - e.price[4].amount})
        }
}
        return (
            <>
            <div>
      <ul>
      <li><Link to="/">Home</Link></li>
        </ul> 
        Total: {this.state.total.toFixed(2)}
        <button onClick={()=>{curr({currency:"USD"})}}>USD</button>
        <button onClick={()=>{curr({currency:"GBP"})}}>GBP</button>
        </div>
          
            {this.props.cart?.map((e)=>(
                <>
                {e.name}
                <br/>
                {e.quantity} 
                <br/>
                {e.price.filter(item => item.currency.label == this.props.currency.currency)[0]?.amount}
                <br/>
              
                <button onClick={()=>{add(e)}}>increment</button>
                <button onClick={()=>{subtract(e)}}>decrement</button>
                <button onClick={()=>{remove(e)}}>remove</button>
                <br/>
                </>
            ))}
            </>
        )
   }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currency:state.cart.currency
});

export default connect(mapStateToProps, { increment, decrement,removeFromCart,incrementQuantity,decrementQuantity,changeCurrency })(Cart);
