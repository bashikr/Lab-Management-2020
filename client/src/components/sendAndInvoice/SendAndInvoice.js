import React, {Component} from 'react'
import axios from 'axios';
import {sendEmail} from "../userFunctions/UserFunctions"
import jwt_decode from 'jwt-decode'
import * as ReactBootStrap from 'react-bootstrap'
import '@formatjs/intl-datetimeformat/locale-data/en' // locale-data for English

class SendAndInvoice extends Component {
    constructor() {
        super();
        this.state = {
            invoice: [],
            invoices: [],
            id: "",
            email: "",
            first_name: "",
            last_name: "",
            html: "",
            from: "",
            subject: "Equipment loan information from Lab Management",
            text: ""
        };
        this.onSubmit = this.onSubmit.bind(this)
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

        axios.get(`/lab/invoices/sendAndInvoice/${this.props.match.params.userId}`)
        .then(res => {
            this.setState({invoice: res.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        if (this.props.match.params.userId == this.state.id) {
            axios.get(`/lab/invoices/showAnInvoice/${this.props.match.params.userId}`)
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
        else {
            this.props.history.push(`/`)
            window.location.reload();
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newEmail = {
            from: this.state.from,
            to: this.state.email,
            subject: this.state.subject,
            text: this.state.text,
            html: `<h3><b>Hello dear student:\n</h3><p>${this.state.first_name} ${this.state.last_name}</p>
                ` + this.state.invoices.map((invoice) => {
                return(
                    `<div className="table-responsive">
                        <div className="table">
                            <thead className="thead-dark">
                                <tr className="text-align-center">
                                    <th className="text-center">Item  </th>
                                    <th className="text-center">Return date</th>
                                </tr>
                            </thead>
                            <tr> `
                                + `<td className="text-center">` +
                                invoice.itemsId + `</td>` + 
                                `<td className="text-center">` +
                                this.formatter.format(Date.parse(invoice.returndate)) + `</td>
                            </tr>
                        </div>
                    </div>`
                )
            })
        }
        sendEmail(newEmail)
        this.props.history.push(`/invoices`)
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
                        {this.state.invoices.map(invoice => {
                            return(
                                <div className="table table-responsive">
                                    <ReactBootStrap.Table
                                        className="table table-image" style={{backgroundColor: "white"}}>
                                        <thead className="thead-dark" xs={6}>
                                            <tr>
                                                <th scope="col">Loan number</th>
                                                <th scope="col">Item</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Pick date</th>
                                                <th scope="col">Return date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
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
                            )
                        })}
                    <button type="submit" onClick={this.onSubmit}
                        className="btn btn-lg btn-primary btn-block"
                        style={{background: "#5bc0e8",
                            width: "40%",
                            margin: "auto",
                            fontWeight: "bold",
                            color: "black",
                            borderRadius: "20",
                            borderStyle: "none"
                        }}
                    >
                        Send the receipt to my email
                    </button>
                </div>
            </div>
        </div>
        );
    }
}

export default SendAndInvoice
