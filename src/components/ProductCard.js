import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import { connect } from "react-redux";
import {addToCartSuccess,changeCurrency} from "../slice/cart"
import "./productcard.css"

class ProductCard extends Component {
  constructor(props){
    super(props)
    this.state = {data: [],item:{}};
}
  render() {
    console.log(this.props.cart)
    const addToCart = (data)=>{
      const e = data;
      this.setState({item:{id:e.id,name:e.name,price:e.prices,attributes:e.attributes} });
        this.props.addToCartSuccess({id:e.id,name:e.name,price:e.prices,gallery:e.gallery,attributes:e.attributes,quantity:1,sizes:this.state.sizes,colors:this.state.colors,pickedSize:this.state.pickedSize,pickedColor:this.state.pickedColor})
    }
    return (
      <div className='product-card'>
          <div className='product-image'>
            {
              this.props.data.gallery?(<>
                 <img className="fishes" src={this.props.data.gallery[0]} width={350} height={330} alt="" />
              </>):(<></>)
            }
       
          <div className='product-image-btn' onClick={()=>{addToCart(this.props.data)}}>
          <img  className="fish" src="/btn.png" alt="" />
          </div>
          </div>
         {
           this.props.data.prices?(<>
            <Link to={{pathname: `/details`,state: this.props.data}}><h3>{this.props.data.name} <br/><span>
            {this.props.data.prices.map((e)=>(
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
           
              
              </span></h3></Link>
     
           </>):(<></>)
         }
          </div>
    )
  }
}
const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currency:state.cart.currency
});

export default connect(mapStateToProps, { addToCartSuccess ,changeCurrency})(ProductCard);

