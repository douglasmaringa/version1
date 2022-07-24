import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './screens/Home';
import Cart from "./screens/Cart"
import ProductDetail from './screens/ProductDetail';
import CartScreen from "./screens/CartScreen"
import Navbar from "./components/Navbar"

class App extends Component {
  render() {
    return (
       <BrowserRouter>
            <div className="App">
            <Navbar/>
                <Switch>
                <Route exact path="/cart" component={CartScreen}/>
                <Route exact path="/details" component={ProductDetail}/>
                <Route exact path="/" component={Home}/>
                    </Switch>
             </div>
       </BrowserRouter>
      
    );
  }
}

export default App;