import React, {Component} from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode'

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            createdOrder: [],
            showSpecificOrder: [],
            id: "",
            email: ""
        };
      }

      componentWillMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            email: decoded.email,
            id: decoded.id
        })
    }

    componentDidMount() {
        axios.get(`/lab/users/showCurrentUser/${this.state.email}`)
        .then(res => {
            this.setState({currentUserId: res.data[0]})
            var res1 = res.data[0];
            var res2 = Object.values(res1[0]);
            var res3 = res2[0]

            if (res3 === this.state.id) {
                axios.get(`/lab/orders/showOneOrder/${res3}`)
                .then(res => {
                    this.setState({showSpecificOrder: res.data[0]})
                })
                .catch(error => {
                    console.log(error)
                })
            }
            else {
                this.props.history.push(`/`)
                window.location.reload();
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        console.log(this.state.order_id)
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" >
                    <div className="purchase-card" >
                        {this.state.showSpecificOrder.map(order => {
                            return (
                                <div>
                                    <p>{order.order_id}</p>
                                    <p>{order.first_name} {order.last_name}</p>
                                    <p>{order.createds}</p>
                                    <p>{order.id}</p>
                                    <p>{order.place}</p>
                                    <p>{order.itemsId}</p>
                                    <p>-----------------------------------</p>
                                    <p>{order.description}</p>
                                    <p>-----------------------------------</p>
                                    <p>status -- i must do it later </p>
                                    <a
                                        href={`/deleteAnOrder/${order.order_id}`}
                                        className="btn btn-lg btn-primary btn-block"
                                        style={{background: "#5bc0e8", width: "40%",
                                            margin: "auto",
                                            fontWeight: "bold",
                                            color: "black",
                                            borderRadius: "20",
                                            borderStyle: "none"
                                        }}
                                    >
                                        Delete item
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart
