import React, {Component} from 'react'
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'
import '@formatjs/intl-datetimeformat/locale-data/en' // locale-data for English
import jwt_decode from 'jwt-decode'

class Reservations extends Component {
    constructor() {
        super();
        this.state = {
            reservations: [],
            id: ""
        };
    }

    componentWillMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            id: decoded.id
        })
    }

    componentDidMount() {
        axios.get(`/lab/orders/showReservationsByUserId/${this.state.id}`)
        .then(res => {
            var res1 = Object.values(res)
            var res2 = res1[0]
            var res3 = res2[0]
            this.setState({reservations: res3})
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
        console.log(this.state.reservations)
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
            <div className="jumbotron mt-5" style={{background: "white"}}>
                <div className="purchase-card" >
                {this.state.reservations != 0 ? this.state.reservations.map(reservation => {
                        return(
                            <div className="table table-responsive">
                                 <ReactBootStrap.Table className="table table-image"
                                    style={{backgroundColor: "white"}}>
                                    <thead className="thead-dark" xs={6}>
                                        <tr>
                                            <th scope="col" className="text-center">Id</th>
                                            <th scope="col" className="text-center">Item</th>
                                            {/* <th scope="col" className="text-center">Reservation queue</th> */}
                                            <th scope="col" className="text-center">Reservation date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td className="text-center">{reservation.reserveid}</td>
                                            <td className="text-center">{reservation.itemsId}</td>
                                            {/* <td className="text-center">{reservation.reservequeue}</td> */}
                                            <td className="text-center">
                                                {this.formatter.format(Date.parse(reservation.reservedate))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </ReactBootStrap.Table>
                            </div>
                        )
                    }) : <p className="text-center">You have no reservations yet</p>}
                </div>
            </div>
        </div>
        );
    }
}

export default Reservations
