import React, { Component } from 'react'
import { connect } from "react-redux";
import "./productdetail.css"
import {addToCartSuccess,changeCurrency} from "../slice/cart"
import parse from "html-react-parser"


class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {image: "",sizes:[],colors:[],pickedSize:"",pickedColor:""};
  }

  componentDidMount() {
    this.props.location.state.attributes.map((e)=>{
      if(e.type== "text"){
        this.setState({sizes:e.items });
          
      }else if(e.type == "swatch"){
        this.setState({colors:e.items });
      }
    })
    this.setState({image:this.props.location.state.gallery[0]})
  }


  render() {
    console.log("sizes",this.state.sizes)
    console.log("colors",this.state.colors)

    const addToCart = (state)=>{
     
      if(this.state.sizes.length>0){
         if(this.state.pickedSize != ""){
          //when product has attributes
          const e = state;
          this.setState({item:{id:e.id,name:e.name,price:e.prices,attributes:e.attributes} });
          this.props.addToCartSuccess({id:e.id,name:e.name,price:e.prices,gallery:e.gallery,attributes:e.attributes,quantity:1,sizes:this.state.sizes,colors:this.state.colors,pickedSize:this.state.pickedSize,pickedColor:this.state.pickedColor})
        }else{
           alert("You Must Pick An Attribute")
        }
      }else{
        //when product has no attributes
        const e = state;
        this.setState({item:{id:e.id,name:e.name,price:e.prices,attributes:e.attributes} });
        this.props.addToCartSuccess({id:e.id,name:e.name,price:e.prices,gallery:e.gallery,attributes:e.attributes,quantity:1,pickedSize:this.state.pickedSize,pickedColor:this.state.pickedColor})
     
      }
     }
    return (
      <div className='details'>
        <div className='details-left'>
          {this.props.location.state.gallery.map((e)=>(
            <div onClick={()=>{this.setState({image:e})}}>
              <img src={e} width={80} height={80} alt="" />
              </div>
          ))}
        </div>

        <div className='details-center'>
         <img src={this.state.image} width={480} height={400} alt="" />
        </div>

        <div className='details-right'>
          <h1>{this.props.location.state.name}</h1>
          <h2>Running Short</h2>
          <h2>Attributes:</h2>
          
          <div className='details-sizes'>
          {this.state.sizes.length > 0?
           (<>
               {this.state.sizes.map((e)=>(
                <>
                 {(() => {
        switch (e.displayValue) {
          case this.state.pickedSize:   return (<>
          <button onClick={()=>{ this.setState({pickedSize: e.displayValue})}} className='black-button'>{e.displayValue}</button>
             </>);
          
          default:      return (<>
          
          <button onClick={()=>{ this.setState({pickedSize: e.displayValue})}} className='normal-button'>{e.displayValue}</button>
           
            </>);
        }
      })()}
                 </>
               ))}
          </>):(<></>)}
          
            
          </div>

          <div className='details-sizes'>
          {this.state.colors.length > 0?
           (<>
               {this.state.colors.map((e)=>(
                <>
                 {(() => {
        switch (e.displayValue) {
          case this.state.pickedColor:   return (<>
          <button onClick={()=>{ this.setState({pickedColor: e.displayValue})}} className='black-button'>{e.displayValue}</button>
             </>);
          
          default:      return (<>
          
          <button onClick={()=>{ this.setState({pickedColor: e.displayValue})}} className='normal-button'>{e.displayValue}</button>
           
            </>);
        }
      })()}
                 </>
               ))}
          </>):(<></>)}
          
            
          </div>


          <h1>Price:<br/><span>
          {this.props.location.state.prices.map((e)=>(
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
           
            </span></h1>
         <button onClick={()=>{addToCart(this.props.location.state)}} className='green-button'>ADD TO CART</button>
         <p>{parse(this.props.location.state.description)}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currency:state.cart.currency
});

export default connect(mapStateToProps, { addToCartSuccess,changeCurrency })(ProductDetail);

