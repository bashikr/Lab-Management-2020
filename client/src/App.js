import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Layout from "./layout/Layout";
import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import Dashboard from "./components/dashboard/Dashboard";
import Admin from "./components/admin/Admin";
import ChangeUserRole from './components/changeUserRole/ChangeUserRole'
import AddItems from './components/addItems/AddItems'
import DeleteItems from './components/deleteItems/DeleteItems'
import About from "./components/about/About";
import CategoryShow from './components/categoryShow/CategoryShow'
import OneItemShow from './components/oneItemShow/OneItemShow'
import DeleteSpecificOrder from './components/deleteSpecificOrder/DeleteSpecificOrder';
import ShowAllOrders from './components/showAllOrders/ShowAllOrders';
import ShowAllReturns from './components/showAllReturns/ShowAllReturns';
import ReturnSpecificItem from './components/returnSpecificItem/ReturnSpecificItem';

import Cart from './components/cart/Cart'
import CartInterface from './components/cartInterface/CartInterface';
import jwt_decode from 'jwt-decode'
import SendAndInvoice from './components/sendAndInvoice/SendAndInvoice';
import ModifyItems from './components/modifyItems/ModifyItems';
import Invoices from './components/invoices/Invoices';
import CheckSpecificReturnedItem from './components/checkSpecificReturnedItem/CheckSpecificReturnedItem';
import AcceptedReturns from './components/acceptedReturns/AcceptedReturns';
import Reservations from './components/reservations/Reservations';

class App extends Component {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        postnumber: '',
        city: '',
        country: '',
        phonenumber: '',
        birthday: '',
        role: '',
        categories: [],
        items: [],
        id: ""
    }

    componentDidMount() {
        if (localStorage.getItem("usertoken") === "undefined" || localStorage.getItem("usertoken") == "null") {
            var token_expired = localStorage.getItem("usertoken")
            var decoded = jwt_decode(token_expired, { header: true })
            var decode_string = decoded["exp"]
            var current_time = Date.now() / 1000;
            if(decode_string < current_time)
            {
                localStorage.clear()
            }
        } else if (localStorage.getItem("usertoken") !== "undefined" && localStorage.getItem("usertoken") !== null) {
            var token_expired = localStorage.getItem("usertoken")
            var decoded = jwt_decode(token_expired)
            this.setState({
                id: decoded.id,
                first_name: decoded.first_name,
                last_name: decoded.last_name,
                email: decoded.email,
                address: decoded.address,
                postnumber: decoded.postnumber,
                city: decoded.city,
                country: decoded.country,
                phonenumber: decoded.phonenumber,
                birthday: decoded.birthday,
                role: decoded.role
            })
        }
    }

render() {
    return (
        <div className="App">
            <Layout header={
                <Router>
                <Header />
                <div>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/category-show/:id" render={(props) => <CategoryShow {...props} />} />
                    <Route exact path="/showItems/:aId" render={(props) => <OneItemShow {...props} />} />
                    {
                        this.state.role =="admin" 
                        ?
                        [
                            <Route exact path="/admin" component={Admin}  />,
                            <Route exact path="/changeRole" component={ChangeUserRole} />,
                            <Route exact path="/dashboard" component={Dashboard} />,
                            <Route exact path="/item-create" component={AddItems} />,
                            <Route exact path="/item-delete" component={DeleteItems} />,
                            <Route exact path="/modifyAnItem" component={ModifyItems} />,
                            <Route exact path="/acceptedReturns" component={AcceptedReturns} />,
                            <Route exact path="/cart/:itemsId/:userId" render={(props) => <Cart {...props} />} />,
                            <Route exact path="/checkItemStatus/:id/:status" render={(props) => <CheckSpecificReturnedItem {...props} />} />,
                            <Route exact path="/cartInterface" component={CartInterface} />,
                            <Route exact path="/showOrders" component={ShowAllOrders} />,
                            <Route exact path="/showReturns" component={ShowAllReturns} />,
                            <Route exact path="/deleteAnOrder/:orderId" component={DeleteSpecificOrder} />,
                            <Route exact path="/returnSpecificInvoice/:invoicenumber" component={ReturnSpecificItem} />,
                            <Route exact path="/invoices" component={Invoices} />,
                            <Route exact path="/reservations" component={Reservations} />,
                            <Route exact path="/sendAndInvoice/:userId" component={SendAndInvoice} />,
                            <Route exact path="/deleteUser/:userId" render={(props) => <ChangeUserRole {...props} />} />,
                            <Route exact path="/" component={Landing} />
                        ]
                        :
                        this.state.role =="user"
                        ?
                        [
                            <Route exact path="/profile" component={Profile} />,
                            <Route exact path="/cart/:itemsId/:userId" render={(props) => <Cart {...props} />} />,
                            <Route exact path="/cartInterface" component={CartInterface} />,
                            <Route exact path="/deleteAnOrder/:orderId" component={DeleteSpecificOrder} />,
                            <Route exact path="/returnSpecificInvoice/:invoicenumber" component={ReturnSpecificItem} />,
                            <Route exact path="/invoices" component={Invoices} />,
                            <Route exact path="/reservations" component={Reservations} />,
                            <Route exact path="/sendAndInvoice/:userId" component={SendAndInvoice} />,
                            <Route exact path="/" component={Landing} />
                        ]
                        :
                        <Route exact path="/" component={Landing} />
                        }
                </div>
            </Router> 
          }  footer={<Footer/>}
            />
      </div>
    );
  }
}

export default App;
