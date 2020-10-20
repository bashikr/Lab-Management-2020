import React, {Component} from 'react'
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'
import '@formatjs/intl-datetimeformat/locale-data/en' // locale-data for English
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle, faCheckCircle} from "@fortawesome/free-solid-svg-icons";

class showAllReturns extends Component {
    constructor() {
        super();
        this.state = {
            showAllReturns: []
        };
    }

    componentDidMount() {
        axios.get(`/lab/returns/showReturnRequests`)
        .then(res => {
            this.setState({showAllReturns: res.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleClick() {
        alert("Are you sure that you want to accept the status of this item!");
    }

    formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    {this.state.showAllReturns.length > 0 ?
                    <div className="purchase-card" >
                        {this.state.showAllReturns.map(order => {
                            return (
                                <div>
                                    <div className="table-responsive">
                                        <ReactBootStrap.Table className="table table-image" >
                                            <thead className="thead-dark">
                                                <tr className="align-middle">
                                                    <th scope="col" className="align-middle">ID</th>
                                                    <th className="align-middle">Username</th>
                                                    <th className="align-middle">Email</th>
                                                    <th className="align-middle">Item</th>
                                                    <th className="align-middle">Pick date</th>
                                                    <th className="align-middle">Return date</th>
                                                    <th className="align-middle">Returned At</th>
                                                    <th className="align-middle">Check</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                <tr>
                                                    <td className="align-middle">{order.id}</td>
                                                    <td className="align-middle">{order.first_name} {order.last_name}</td>
                                                    <td className="align-middle">{order.email}</td>
                                                    <td className="align-middle">{order.itemsId}</td>
                                                    <td className="align-middle">
                                                        {this.formatter.format(Date.parse(order.delivered))}
                                                    </td>
                                                    <td className="align-middle">
                                                        {this.formatter.format(Date.parse(order.returndate))}
                                                    </td>
                                                    <td className="align-middle">
                                                        {this.formatter.format(Date.parse(order.returnedAt))}
                                                    </td>
                                                    <td className="text-center" >
                                                        <a 
                                                        href={`/checkItemStatus/${order.id}/${0}`} 
                                                        style={{color: "#dc1a1a", backgroundColor: "whitesmoke"}}>
                                                            <FontAwesomeIcon icon={faTimesCircle} size="2x"/>
                                                        </a>
                                                        <a onClick={this.handleClick}
                                                        href={`/checkItemStatus/${order.id}/${1}`}
                                                        style={{color: "green", backgroundColor: "whitesmoke"}}>
                                                            <FontAwesomeIcon icon={faCheckCircle} size="2x"/>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </ReactBootStrap.Table>
                                    </div>
                                </div>
                            )
                        })}
                    </div> :  <h3 className="text-center">The are no return requests for now!</h3>
                }
                </div>
            </div>
        );
    }
}

export default showAllReturns
