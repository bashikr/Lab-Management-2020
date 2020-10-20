import React, { Component} from "react";
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {faHistory} from "@fortawesome/free-solid-svg-icons";
import jwt_decode from 'jwt-decode'

class OneItemShow extends Component {
    constructor () {
        super()
        this.state = {
        itemId: "",
        id: '',
        itemSpecification: [],
        itemTry: "",
        email: "",
        role: "",
        showSpecificOrder:[],
        currentReserve: [],
        reservationShow: "",
        final1: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmit1 = this.onSubmit1.bind(this)
    }

    componentWillMount() {
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
                email: decoded.email,
                role: decoded.role
            })
        }
        axios.get(`/lab/items/showItems/${this.props.match.params.aId}`)
        .then(res => {
            var result = res.data[0]
            var result1 = result[0]
            var result3 = Object.values(result1)

            this.setState({itemTry: result3})
            this.setState({itemSpecification: res.data[0]})
        })
        .catch(error => {
            console.log(error)
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
                var res1 = res.data[0]
                var res2 = res1[0]
                var res3 = Object.values(res2)
                var res4 = res3[res3.length-2]

                this.setState({showSpecificOrder: res4})
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(`/lab/orders/showReservationsByUserId/${this.state.id}`)
        .then(res => {
            var res1 = Object.values(res)
            var res2 = res1[0]
            var res3 = res2[0]

            res3.map(one => {
                var final = Object.values(one);
                console.log(final[1])
                this.setState({final1: final[1]})
            })
            this.setState({reservationShow: res3})
        })
        .catch(error => {
            console.log(error)
        })
    }

    onChange(e) {
        var key = e.target.name;
        var value = e.target.value;
        var obj = {};
        obj[key] = value;
        this.setState(obj);
    }

    onSubmit (e) {
        e.preventDefault()
        axios.get(`/lab/users/showCurrentUser/${this.state.email}`)
        .then(res => {
            this.setState({currentUserId: res.data[0]})
            var res1 = res.data[0];
            var res2 = Object.values(res1[0]);
            var res3 = res2[0]
            if(res3 === this.state.id) {
                axios.get(`/lab/orders/orderCreate/${this.state.itemTry[0]}/${res3}`)
                .then(res => {
                    this.setState({createdOrder: res.data[0]})
                })
                .catch(error => {
                    console.log(error)
                })
                this.props.history.push(`/cartInterface`)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    onSubmit1 (e) {
        e.preventDefault()
        axios.get(`/lab/users/showCurrentUser/${this.state.email}`)
        .then(res => {
            this.setState({currentUserId: res.data[0]})
            var res1 = res.data[0];
            var res2 = Object.values(res1[0]);
            var res3 = res2[0]

            if(res3 === this.state.id) {
                axios.get(`/lab/orders/createReserve/${this.state.itemTry[0]}/${res3}`)
                .then(res => {
                    this.setState({currentReserve: res.data})
                })
                .catch(error => {
                    console.log(error)
                })
                this.props.history.push(`/reservations`)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    <h1 className="text-center"> Show Specific items details</h1>
                        <br></br>
                        {this.state.itemSpecification.map(item => {
                            return(
                                <div className="table-responsive">
                                    <ReactBootStrap.Table className="table table-image" >
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Picture</th>
                                                <th>Item Name</th>
                                                <th>Amount</th>
                                                <th>Description</th>
                                                <th>Item Code</th>
                                                <th>Category</th>
                                                <th>Place</th>
                                                <th>Book it</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            <tr >
                                                <td class="w-25">
                                                    <img class="img-fluid img-thumbnail" src={`${item.picturelink}`}/>
                                                </td>
                                                <td className="align-middle"
                                                
                                                value={this.state.itemId}
                                                onChange={this.onChange}
                                                >{item.id}</td>
                                                <td className="align-middle">{item.totalAmount}</td>
                                                <td className="align-middle">{item.description}</td>
                                                <td className="align-middle">{item.productcode}</td>
                                                <td className="align-middle">{item.category}</td>
                                                <td className="align-middle">{item.place} | {item.shelfAmount} st</td>
                                                <td className="align-middle">
                                                {((this.state.role == "admin" || this.state.role == "user") && 
                                                (this.state.itemTry[0]=== this.state.showSpecificOrder)
                                                ) ? (
                                                <a 
                                                href={`/cartInterface`}
                                                style={{color:"green", background: "none"}}>
                                                    <FontAwesomeIcon icon={faFolderOpen} size="2x" 
                                                />
                                                    <br></br>
                                                    My Items
                                                </a>
                                                ) :
                                                ((this.state.role == "admin" || this.state.role == "user") && 
                                                (this.state.itemTry[0] !== this.state.showSpecificOrder) &&
                                                (this.state.itemTry[2] !== 0)
                                                ) ?
                                                    ( <button  onClick={this.onSubmit}
                                                        style={{border:"none", background: "none"}}>
                                                    <a 
                                                        href={`/cart/${item.id}/${this.state.id}`}
                                                            style={{color:"green"}}>
                                                            <FontAwesomeIcon icon={faPlusCircle} size="2x"/>
                                                        <br></br>
                                                    Add
                                                    </a>
                                                    </button>)
                                                    :
                                                ((this.state.role == "admin" || this.state.role == "user") && 
                                                this.state.itemTry[2] == 0) ?
                                                    (
                                                        (this.state.final1 != item.id) ?
                                                        (
                                                            <button
                                                                onClick={this.onSubmit1}
                                                                style={{border:"none",
                                                                    background: "none"
                                                                }}
                                                            >
                                                                <a
                                                                    href={`/createReserve/${item.id}/${this.state.id}`}
                                                                    style={{color:"green"}}
                                                                >
                                                                    <FontAwesomeIcon icon={faFolder} size="2x"/>
                                                                    <br></br>
                                                                    Reserve
                                                                </a>
                                                            </button>) : 
                                                            <button style={{border:"none", background: "none"}}>
                                                                <a 
                                                                    href={`/reservations`}
                                                                    style={{color:"green"}}
                                                                >
                                                                    <FontAwesomeIcon icon={faHistory} size="2x"/>
                                                                    <br></br>
                                                                    My reservations
                                                                </a>
                                                            </button>
                                                        )
                                                        :
                                                    <a
                                                        href={`/login`}
                                                        style={{color:"green"}}>
                                                        <FontAwesomeIcon icon={faSignInAlt} size="2x"
                                                    />
                                                        <br></br>
                                                        Login
                                                    </a>
                                            }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </ReactBootStrap.Table>
                                </div>
                            )
                        })}
                </div>
            </div>
        )
    }
}

export default OneItemShow;
