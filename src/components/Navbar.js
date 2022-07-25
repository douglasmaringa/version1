import React,{Component} from 'react';
import { Link } from 'react-router-dom'
import "./navbar.css"
import {changeCurrency} from "../slice/cart"
import { connect } from "react-redux";
import { Modal } from 'react-modal-overlay'
import 'react-modal-overlay/dist/index.css'
import Mini from '../screens/Mini';


class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {showModal: false};
    }
    
    render(){
        //open cart overlay
       const toggleModal = () => {
        
            this.setState({
              showModal: !this.state.showModal
            })
          }

        //pick a currency
    const curr = (currency)=>{
        this.props.changeCurrency({currency:currency})
        
    }
        console.log(this.props.cart)
    return(
            <div>
                <div className="navbar">
                   
                    <ul>
                        <li className="navbar-left"><Link to="/">Technology</Link></li>
                        <li><Link to="/cart">Clothes</Link></li>
                      
                        <li  className="navbar-center"><Link to="/cart"><img src="/log.png" alt="" /></Link></li>
                         <div class="dropdown">
                          {(() => {
        switch (this.props?.currency?.currency) {
          case "USD":   return (<>
          <li className="navbar-right"><Link to="/cart">$ &or;</Link></li>
                           </>);
        case "GBP":   return (<>
            <li className="navbar-right"><Link to="/cart">£ &or;</Link></li>
                             </>);
          case "AUD":   return (<>
            <li className="navbar-right"><Link to="/cart">A$ &or;</Link></li>
                             </>);
            case "JPY":   return (<>
                <li className="navbar-right"><Link to="/cart">¥ &or;</Link></li>
                                 </>);
            case "RUB":   return (<>
                <li className="navbar-right"><Link to="/cart">₽ &or;</Link></li>
                                 </>);
            
          default:      return (<>
          
          <li className="navbar-right"><Link to="/cart">$ &or;</Link></li>
                
            </>);
        }
      })()}                
                          <div class="dropdown-content">
                          <p onClick={()=>{curr({currency:"USD"})}} className='link'>USD</p>
                          <p onClick={()=>{curr({currency:"GBP"})}} className='link'>GBP</p>
                          <p onClick={()=>{curr({currency:"AUD"})}} className='link'>AUD</p>
                          <p onClick={()=>{curr({currency:"JPY"})}} className='link'>JPY</p>
                          <p onClick={()=>{curr({currency:"RUB"})}} className='link'>RUB</p>
                          </div>
                          </div>

                         
                        
                        
                         
                        <li className="navbar-right"><a onClick={toggleModal} to="/cart"><img src="/cart.png" alt="" /></a></li>
                                        
                         {
                            this.state.showModal?(<><div class="modal-footer-small">
                            <div class="ui-modal-body">
                            <button style={{width:"50px",marginLeft:"auto"}} onClick={()=>{toggleModal()}}>close</button>
                                <Mini/>
                            
                            </div>
                          </div></>):(<></>)
                         }

                    </ul>
                </div>
                <div >
        
       
      </div>
            </div>
   
        
    )
}
}

const mapStateToProps = (state) => ({
    currency:state.cart.currency,
    cart: state.cart.cart,
  });
  
  export default connect(mapStateToProps, { changeCurrency })(Navbar);
  