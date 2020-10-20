import React, { Component } from 'react'
import {withRouter, NavLink} from "react-router-dom"
import styles from "../header/Header.module.scss";
import jwt_decode from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark} from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
    constructor(){
        super()
        this.state = {
            isSwitchOn: false,
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            postnumber: '',
            city: '',
            country: '',
            phonenumber: '',
            birthday: '',
            role: '',
            id: "",
            width: ""
        }
    }

    componentDidMount() {
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
            first_name: decoded.first_name.toUpperCase(),
            last_name: decoded.last_name.toUpperCase(),
            email: decoded.email,
            address: decoded.address,
            postnumber: decoded.postnumber,
            city: decoded.city,
            country: decoded.country,
            phonenumber: decoded.phonenumber,
            birthday: decoded.birthday,
            role: decoded.role
        })
      }
    }

    componentWillMount(){
        this.setState({width: window.innerWidth});
      }

    logOut(e){
        e.preventDefault()
        localStorage.clear()
        this.props.history.push(`/login`)
    }

    render() {
        const loginRegLink = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <img src="/brand.png" style={{width: "100px", height: "100px",
                    borderRadius: "50%", border: "5px solid #5BC0E8"}} className="navbar-brand"
                />
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" activeClassName={styles.active}>
                                <a className="nav-link">
                                    Home
                                </a>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" activeClassName={styles.active}>
                                <a className="nav-link">
                                    About
                                </a>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/register" activeClassName={styles.active}>
                                <a className="nav-link">
                                Register
                                </a>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" activeClassName={styles.active}>
                                <a className="nav-link">
                                Login
                                </a>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )

        const userLink = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <img src="/brand.png" style={{width: "100px", height: "100px",
                    borderRadius: "50%", border: "5px solid #5BC0E8"}} className="navbar-brand"
                />
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" activeClassName={styles.active}>
                                <a className="nav-link">
                                    Home
                                </a>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/profile" activeClassName={styles.active}>
                                <a className="nav-link">
                                    {this.state.first_name} {this.state.last_name}
                                </a>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" activeClassName={styles.active}>
                                <a className="nav-link">
                                    About
                                </a>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/invoices" activeClassName={styles.active}>
                                <a className="nav-link">
                                    Loans
                                </a>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/reservations" activeClassName={styles.active}>
                                <a className="nav-link">
                                    Reservations
                                </a>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/logout" activeClassName={styles.active}>
                                <a onClick={this.logOut.bind(this)} className="nav-link">
                                    Logout
                                </a>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item" >
                        <NavLink to="/cartInterface" activeClassName={styles.active} >
                            <a className="nav-link" >
                                My Items &ensp; <FontAwesomeIcon icon={faBookmark}  />
                            </a>
                        </NavLink>
                    </li>
                </ul>
                </div>
            </nav>
        )

        const adminLink = (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
            data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"
            aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <img src="/brand.png" style={{width: "100px", height: "100px",
                borderRadius: "50%", border: "5px solid #5BC0E8"}} className="navbar-brand"
            />

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink to="/admin" activeClassName={styles.active}>
                            <a className="nav-link">
                                {this.state.first_name} {this.state.last_name} / ADMIN
                            </a>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/dashboard"  activeClassName={styles.active}>
                            <a className="nav-link">
                                Dashboard
                            </a>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" activeClassName={styles.active}>
                            <a className="nav-link">
                                About
                            </a>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/invoices" activeClassName={styles.active}>
                            <a className="nav-link">
                                Loans
                            </a>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/reservations" activeClassName={styles.active}>
                            <a className="nav-link">
                                Reservations
                            </a>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/logout" activeClassName={styles.active}>
                            <a onClick={this.logOut.bind(this)} className="nav-link">
                                Logout
                            </a>
                        </NavLink>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item" >
                        <NavLink to="/cartInterface" activeClassName={styles.active} >
                            <a className="nav-link" >
                                My Items &ensp; <FontAwesomeIcon icon={faBookmark}  />
                            </a>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>

        )
        return (
            <div className={styles.topnav}>
                {(localStorage.getItem("usertoken") && this.state.role==="admin") ? adminLink :
                (localStorage.getItem("usertoken") && this.state.role==="user") ? userLink :
                loginRegLink}
            </div>
        )
    }
}

export default withRouter(Navbar)
