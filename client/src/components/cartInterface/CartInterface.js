import React, {Component} from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import * as ReactBootStrap from 'react-bootstrap'
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CartInterface extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            createdOrder: [],
            showSpecificOrder: [],
            invoices: [],
            currentUserId: "",
            id: "",
            email: "",
            first_name: "",
            last_name: "",
            html: "",
            from: "bashikr@gmail.com",
            subject: "Invoice information from Lab Management",
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
    }

    componentDidMount() {
        axios.get(`/lab/users/showCurrentUser/${this.state.email}`)
        .then(res => {
            this.setState({currentUserId: res.data[0]})
            var res1 = res.data[0];
            var res2 = Object.values(res1[0]);
            var res3 = res2[0]

            axios.get(`/lab/orders/showOneOrder/${res3}`)
            .then(res => {
                this.setState({showSpecificOrder: res.data[0]})
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })

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

    onSubmit (e) {
        e.preventDefault()
        this.props.history.push(`/sendAndInvoice/${this.state.id}`)
        window.location.reload();
    }

    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
            <div className="jumbotron mt-5" style={{background: "white"}}>
                <div className="purchase-card" >
                    {this.state.showSpecificOrder.map(order => {
                        return(
                            <div>
                                 <ReactBootStrap.Table className="table table-image" style={{backgroundColor: "white"}}>
                                    <thead className="thead-dark" xs={6}>
                                        <tr>
                                            <th scope="col">Picture</th>
                                            <th style={{textAlign: "center"}}>Description</th>
                                            <th style={{textAlign: "center"}}>
                                            <a
                                                href={`/deleteAnOrder/${order.order_id}`} 
                                                style={{float:"right", marginTop: "-8%",
                                                marginRight: "-8%",
                                                color: "#dc1a1a",
                                                backgroundColor: "whitesmoke"
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTimesCircle} size="2x" />
                                            </a>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td className="w-25">
                                                <img className="img-fluid img-thumbnail" src={`${order.picturelink}`}/>
                                            </td>
                                            <td className="align-top-middle">{order.description}
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <p>Product: {order.productname} | Category: {order.category}</p>
                                            <p>Place: {order.place} | Amount: {order.shelfAmount} st</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </ReactBootStrap.Table>
                            </div>
                        )
                    })}
                    {this.state.showSpecificOrder.length !== 0 ?
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
                            Borrow
                        </button> :
                    <p className="text-center">You have not ordered yet</p>
                }
                </div>
            </div>
        </div>
        );
    }
}

export default CartInterface
