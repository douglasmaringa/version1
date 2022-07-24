import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { addShipping } from './actions/cartActions'
class Recipe extends Component{
    
   

    handleChecked = (e)=>{
        if(e.target.checked){
            this.props.addShipping();
        }
        else{
            this.props.substractShipping();
        }
    }

    render(){
  
        return(
            <div >
               
                        <li ><b>Total: ${parseFloat(this.props.total).toFixed(2)} </b></li>
                   
                 </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
