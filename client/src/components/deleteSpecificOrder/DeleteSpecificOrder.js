import React, {Component} from 'react'
import axios from 'axios';

class DeleteSpecificOrder extends Component {
    constructor() {
        super();
        this.state = {
          collapsed: false,
          createdOrder: [],
          showSpecificOrder: [],
          order_id: ""
        };
      }

    componentDidMount() {
        axios.get(`/lab/orders/deleteAnOrder/${this.props.match.params.orderId}`)
        .then(res => {
            this.setState({showSpecificOrder: res.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
        this.props.history.push(`/cartInterface/`)
    }

    render() {
        return (
        <div className="container" style={{height:"100%", minHeight:700}}>
            <div className="jumbotron mt-5" style={{background: "white"}}>
                <div className="purchase-card" >
                   <p>done</p>
                </div>
            </div>
        </div>
        );
    }
}

export default DeleteSpecificOrder
