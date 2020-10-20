import React, {Component} from 'react'
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'
import '@formatjs/intl-datetimeformat/locale-data/en' // locale-data for English

class ShowAllOrders extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            showAllOrders: []
        };
      }

    componentDidMount() {
        axios.get(`/lab/invoices/showAllInvoices/`)
        .then(res => {
            this.setState({showAllOrders: res.data[0]})
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
        console.log(this.state.showAllOrders)
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    {this.state.showAllOrders.length > 0 ?
                    <div className="purchase-card" >
                        {this.state.showAllOrders.map(order => {
                            return (
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
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr >
                                            <td className="align-middle">{order.invoicenumber}</td>
                                            <td className="align-middle">{order.first_name} {order.last_name}</td>
                                            <td className="align-middle">{order.email}</td>
                                            <td className="align-middle">{order.itemsId}</td>
                                            <td className="align-middle">{this.formatter.format(Date.parse(order.delivered))}</td>
                                            <td className="align-middle">{this.formatter.format(Date.parse(order.returndate))}</td>
                                        </tr>
                                    </tbody>
                                </ReactBootStrap.Table>
                            </div>
                            )
                        })}
                    </div> :  <h3 className="text-center">The are no user loans made yet!</h3> }
                </div>
            </div>
        );
    }
}

export default ShowAllOrders
