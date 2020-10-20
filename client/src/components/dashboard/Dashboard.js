import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Landing from '../landing/Landing'
import Layout from "../../layout/Layout";
import Sidebar from "../sidebar/Sidebar";
import Admin from '../admin/Admin'

class Dashboard extends Component {
    render() {
        return (
            <Layout content={
                <Router>
                <div>
                    <Route exact path="/admin" component={Admin} />
                </div>
                <div style={{height:"100%", minHeight:700}} >
                    <Landing />
                </div>
                </Router>
            }
            sidebar={
            <Sidebar style={{height:"100%"}}/>
            }
            
            />
        );
    }
}

export default Dashboard;
