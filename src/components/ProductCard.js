import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import { connect } from "react-redux";
import {addToCartSuccess} from "../slice/cart"
import "./productcard.css"

class ProductCard extends Component {
  constructor(props){
    super(props)
    this.state = {data: [],item:{}};
}
  render() {
    console.log(this.props.cart)
    const addToCart = (data)=>{
      this.setState({item:{id:data.id,name:data.name,price:data.prices,attributes:data.attributes} });
      this.props.addToCartSuccess({id:data.id,name:data.name,price:data.prices,attributes:data.attributes,quantity:1})
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
            <Link to={{pathname: `/details`,state: this.props.data}}><h3>{this.props.data.name} <br/><span>${this.props.data.prices[0].amount}</span></h3></Link>
     
           </>):(<></>)
         }
          </div>
    )
  }
}
const mapStateToProps = (state) => ({
  cart: state.cart.cart
});

export default connect(mapStateToProps, { addToCartSuccess })(ProductCard);

