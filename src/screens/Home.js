import React,{Component} from 'react'
import { connect } from "react-redux";
import {ApolloClient,InMemoryCache,ApolloProvider,useQuery,gql} from "@apollo/client";
import { increment, decrement } from "../slice/counterSlice"
import {addToCartSuccess,changeCurrency} from "../slice/cart"
import { Link } from 'react-router-dom'
import "./Home.css"
import ProductCard from "../components/ProductCard"

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {data: [],item:{}};
    }
    componentDidMount() {
        const client = new ApolloClient({
          uri: 'http://localhost:4000/',
          cache: new InMemoryCache()
        });
        
      
        client
        .query({
        query: gql`
          query getcategories {
              category{
                  name
                  products{
                      id
                      name
                      description
                      category
                      inStock  
                      brand
                      gallery
                      prices{
                          amount
                          currency{
                              label
                              symbol
                          }
                      } 
                      attributes{
                          id
                          items{
                            displayValue
                          }
                          type
                        }   
                }
            }
          }
        `
        })
        .then((result) => {
          //array with prices and currencies put all currencies in cart with selected currency in so u ca change later
          //array with images
          //array with sizes put all sizes in cart with selected so u can change later
          this.setState({data:result.data.category.products });
          
        })
      
      }
   render(){
    console.log(this.state.data)
   

    const addToCart = (e)=>{
        this.setState({item:{id:e.id,name:e.name,price:e.prices,attributes:e.attributes} });
        this.props.addToCartSuccess({id:e.id,name:e.name,price:e.prices,gallery:e.gallery,attributes:e.attributes,quantity:1})
    }
        return (
            <>
            <div>
            <div className='home'> 
          <h2>Category Name</h2>
          <div className='home-card'>
            {
              this.state.data.map((e)=>(
                <div key={e.id}>
                <ProductCard data={e}/>
                </div>
              ))
            }
         
          </div>
         
     </div>
      
        </div>
           
            </>
        )
   }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  currency:state.cart.currency
});

export default connect(mapStateToProps, { increment, decrement,addToCartSuccess,changeCurrency })(Home);
