import React, {Component} from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import * as ReactBootStrap from 'react-bootstrap'
import {faUndoAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '@formatjs/intl-datetimeformat/locale-data/en' // locale-data for English

class Invoices extends Component {
    constructor() {
        super();
        this.state = {
            invoice: [],
            invoices: [],
            id: "",
            email: "",
            first_name: "",
            last_name: ""
        };
    }

    componentWillMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            email: decoded.email,
            id: decoded.id,
            first_name: decoded.first_name,
            last_name: decoded.last_name
        })
    }

    componentDidMount() {
        axios.get(`/lab/invoices/showAnInvoice/${this.state.id}`)
            .then(res => {
                var res1 = Object.values(res)
                var res2 = res1[0]
                var res3 = res2[0]

                this.setState({invoices: res3})
        })
        .catch(error => {
            console.log(error)
        })
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
                <div className="purchase-card" >
                {this.state.invoices != 0 ? this.state.invoices.map(invoice => {
                        return(
                            <div className="table table-responsive">
                                <ReactBootStrap.Table className="table table-image"
                                    style={{backgroundColor: "white"}}
                                >
                                    <thead className="thead-dark" xs={6}>
                                        <tr>
                                            <th scope="col">Loan number</th>
                                            <th scope="col">Item</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Pick date</th>
                                            <th scope="col">Return date</th>
                                            <th style={{textAlign: "center"}}>
                                            <a
                                                href={`/returnSpecificInvoice/${invoice.invoicenumber}`}
                                                style={{
                                                    float:"right", marginTop: "-8%",
                                                    marginRight: "-8%",
                                                    color: "#dc1a1a",
                                                    textDecoration: "none"
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faUndoAlt} size="2x" />
                                                <br></br>
                                                Return
                                            </a>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="align-top-middle">{invoice.invoicenumber}</td>
                                            <td className="align-top-middle">{invoice.itemsId}</td>
                                            <td className="align-top-middle">{invoice.amount}</td>
                                            <td className="align-top-middle">
                                                {this.formatter.format(Date.parse(invoice.delivered))}
                                            </td>
                                            <td className="align-top-middle">
                                                {this.formatter.format(Date.parse(invoice.returndate))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </ReactBootStrap.Table>
                            </div>
                        )}) : <p className="text-center">You have no loans yet</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Invoices
