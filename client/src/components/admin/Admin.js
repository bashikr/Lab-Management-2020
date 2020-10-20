import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import '@formatjs/intl-datetimeformat/locale-data/en' // locale-data for sweden

class Admin extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            postnumber: '',
            city: '',
            country: '',
            phonenumber: '',
            birthday: '',
            role: ''
        }
    }

    formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    })

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
            address: decoded.address,
            postnumber: decoded.postnumber,
            city: decoded.city,
            country: decoded.country,
            phonenumber: decoded.phonenumber,
            birthday: this.formatter.format(Date.parse(decoded.birthday)),
            role: decoded.role
        })
    }

    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto" >
                        <tbody>
                            <tr >
                                <td>First Name: </td>
                                <td>{this.state.first_name}</td>
                            </tr>
                            <tr>
                                <td>Last Name: </td>
                                <td >{this.state.last_name}</td>
                            </tr>
                            <tr>
                                <td>Email: </td>
                                <td >{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Address: </td>
                                <td>{this.state.address}</td>
                            </tr>
                            <tr>
                                <td>City: </td>
                                <td>{this.state.city}</td>
                            </tr>
                            <tr>
                                <td>Country: </td>
                                <td>{this.state.country}</td>
                            </tr>
                            <tr>
                                <td>Post Number: </td>
                                <td>{this.state.postnumber}</td>
                            </tr>
                            <tr>
                                <td>Phone Number: </td>
                                <td>{this.state.phonenumber}</td>
                            </tr>
                            <tr>
                                <td>Role: </td>
                                <td>{this.state.role}</td>
                            </tr>
                            <tr>
                                <td>Birthday: </td>
                                <td>{this.state.birthday}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Admin
