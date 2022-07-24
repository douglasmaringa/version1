import React, { Component } from 'react'
import "./cartscreen.css"
import { connect } from "react-redux";
import {ApolloClient,InMemoryCache,ApolloProvider,useQuery,gql} from "@apollo/client";
import { increment, decrement } from "../slice/counterSlice"
import {removeFromCart,incrementQuantity,decrementQuantity,changeCurrency} from "../slice/cart"
import { Link,withRouter } from 'react-router-dom'


class CartScreen extends Component {
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


  render() {
    console.log(this.props.cart)
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
  const add = (item)=>{
      this.props.incrementQuantity({id:item.id})
      if(this.props.currency.currency == "USD"){
      this.setState({total:this.state.total + item.price[0].amount})
      }else if(this.props.currency.currency == "GBP"){
          this.setState({total:this.state.total + item.price[1].amount})
      }else if(this.props.currency.currency == "AUD"){
          this.setState({total:this.state.total + item.price[2].amount})
      }else if(this.props.currency.currency == "JPY"){
          this.setState({total:this.state.total + item.price[3].amount})
      }else{
          this.setState({total:this.state.total + item.price[4].amount})
      }
 }

 //remove from cart based on currency
 const subtract = (item)=>{
  this.props.decrementQuantity({id:item.id})
  
  if(this.props.currency.currency == "USD"){
      this.setState({total:this.state.total - item.price[0].amount})
   }else if(this.props.currency.currency == "GBP"){
      this.setState({total:this.state.total - item.price[1].amount})
      }else if(this.props.currency.currency == "AUD"){
          this.setState({total:this.state.total - item.price[2].amount})
      }else if(this.props.currency.currency == "JPY"){
          this.setState({total:this.state.total - item.price[3].amount})
      }else{
          this.setState({total:this.state.total - item.price[4].amount})
      }
}

    let addedItems = this.props.cart.length ?
    (  
        this.props.cart.map(item=>{
            return(
      <div className='cartscreen'>

              <li key={item.id}>
              <div  className='cart-card'>
              <div className='cart-left'>
              <h1 style={{fontWeight:"bold",fontSize:"26px",marginTop:"25px"}}>{item.id} <br/><span>{item.name}</span><br/> 
              {item.price.map((e)=>(
                <>
                 {(() => {
        switch (e?.currency?.label) {
          case this.props.currency.currency:   return (<>
          {e?.currency?.symbol}{e?.amount}
           </>);
          
          default:      return (<>
          
           
            </>);
        }
      })()}
                </>
              ))}
              
            
              
              </h1>
             
              {item?.sizes?.length > 0?
           (<>
               {item?.sizes?.map((e)=>(
                <>
                 {(() => {
        switch (e.displayValue) {
          case item.pickedSize:   return (<>
          <button  className='black-button'>{e.displayValue}</button>
             </>);
          
          default:      return (<>
          
          <button  className='normal-button'>{e.displayValue}</button>
           
            </>);
        }
      })()}
                 </>
               ))}
          </>):(<></>)}
          
          <br/>

          {item?.colors?.length > 0?
           (<>
               {item?.colors?.map((e)=>(
                <>
                 {(() => {
        switch (e.displayValue) {
          case item.pickedColor:   return (<>
          <button  className='black-button1' style={{backgroundColor:e.displayValue,border:"solid",borderColor:"blue",borderWidth:"4px"}}></button>
             </>);
          
          default:      return (<>
          
          <button  className='normal-button1' style={{backgroundColor:e.displayValue,border:"solid"}}></button>
           
            </>);
        }
      })()}
                 </>
               ))}
          </>):(<></>)}
          
              </div>

              <div className='cart-right'>
                <div className='cart-right-left'>
                 <button onClick={()=>{add(item)}} className='normal-button2'>+</button>
                    <p>{item.quantity}</p>
                  <button onClick={()=>{subtract(item)}} className='normal-button2'>-</button>
                </div>
                <div className='cart-right-right'>
                    <img src={item.gallery[0]} width={140} height={180} alt="" />
                </div>
              </div>
          </div>
</li>
            </div>    
                )
              })
          ):

           (
              <p style={{marginLeft:"60px"}}>Cart is empty</p>
           )
     return(
          <div className='cartscreen' >
             <h1 style={{marginLeft:"50px"}}>Cart</h1>
           
                      {addedItems}
              
                      
                      <div  style={{marginLeft:"50px"}}>
                        <h1 style={{fontWeight:"lighter",fontSize:"24px"}}>Quantity:{this.props.cart.length}</h1>
                        <h1 style={{fontWeight:"lighter",fontSize:"24px"}}>Total: {this.state.total.toFixed(2)}</h1>
                        <button  style={{width:"250px",height:"40px",color:"white",backgroundColor:"#5ECE7B",fontWeight:"600"}} >ORDER</button>
         
                      </div>
          </div>
     )
  }
}


const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currency:state.cart.currency
});

export default connect(mapStateToProps, { increment, decrement,removeFromCart,incrementQuantity,decrementQuantity,changeCurrency })(CartScreen);

