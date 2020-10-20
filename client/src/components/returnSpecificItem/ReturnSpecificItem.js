import React, {Component} from 'react'
import axios from 'axios';

class ReturnSpecificInvoice extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            createdOrder: [],
            showSpecificInvoice: [],
            order_id: ""
        };
      }

    componentDidMount() {
        axios.get(`/lab/returns/returnSpecificInvoice/${this.props.match.params.invoicenumber}`)
        .then(res => {
            this.setState({showSpecificInvoice: res.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    <div className="purchase-card">
                    <h3 className="text-center">Your request has been approved.</h3>
                    <p className="text-center">
                    The item will be checked by the admin before accepting it.
                    You do not need to do anything right now.
                        </p>
                        <a href="/invoices" class="btn btn-lg btn-primary btn-block" type="button"
                            style= {{
                                background: "rgb(91, 192, 232)", width: "40%",
                                margin: "auto",
                                fontWeight: "bold",
                                color: "black",
                                borderStyle: "none",
                                marginTop: "10%"
                            }}
                        >Back to the loan's page</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReturnSpecificInvoice
