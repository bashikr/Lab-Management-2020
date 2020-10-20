import React, {Component} from 'react'
import styles from "../register/Register.module.scss";
import {changeUserPrivileges} from "../userFunctions/UserFunctions"
import * as ReactBootStrap from 'react-bootstrap'
import axios from 'axios';
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@formatjs/intl-datetimeformat/locale-data/sv' // locale-data for Sweden

class ChangeUserRole extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            role: '',
            errors: [],
            showUsers: [],
            usersId : []
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount() {
        axios.get("/lab/users/showUsers", {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(res => {
            console.log(res)
            var res1 = Object.values(res)
            var res2 = res1[0]

            res2.map(one => {
                this.setState({usersId: one.id})
            })
            this.setState({showUsers: res.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        axios.get(`/lab/users/deleteUser/${this.props.match.params.userId}`,
            {mode: 'cors', 'Cache-Control': 'no-cache'}
        )
        .then(res => {
            this.setState({deleteUser: res.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    renderUser(user, index) {
        return(
                <tr key={index}>
                <td className="text-center">{user.first_name} {user.last_name}</td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">{user.role}</td>
                <td className="text-center">{ new Intl.DateTimeFormat("sv", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit"
                                        }).format(Date.parse(user.created))}</td>
                <td className="text-center">
                {user.role !== "admin" ?
                    <a 
                    href={`/deleteUser/${user.id}`}
                    style={{color: "#dc1a1a", backgroundColor: "whitesmoke"}}>
                        <FontAwesomeIcon icon={faTimesCircle} size="2x"/>
                    </a>
                    : 
                    <p></p>
                }
                </td>
            </tr>
        )
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    onChange(e) {
        var key = e.target.name;
        var value = e.target.value;
        var obj = {};
        obj[key] = value;
        this.setState(obj);
    }

    onSubmit(e) {
        e.preventDefault()
        var errors = [];

        if (this.state.role === "") {
            errors.push("role");
        }

        const expression = /\S+@\S+/;
        var validEmail = expression.test(String(this.state.email).toLowerCase());

        if (!validEmail) {
            errors.push("email");
            }
            this.setState({
            errors: errors
        });

        if (errors.length > 0) {
            return false;
        } else {
            alert("everything good. submit form!");
        }

        const user = {
            email: this.state.email,
            role: this.state.role,
        }

        changeUserPrivileges(user).then(res => {
            this.props.history.push(`/admin`)
        })
        window.location.reload();
    }

    render() {
        return (
            <div className="container"  style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                <h1 className="text-center"> Show Specific items details</h1>
                                <br></br>
                                <div className="table-responsive">
                                    <ReactBootStrap.Table  className="table" >
                                    <thead className="thead-dark">
                                        <tr className="text-align-center">
                                            <th className="text-center">Username</th>
                                            <th className="text-center">email</th>
                                            <th className="text-center">User Role</th>
                                            <th className="text-center">Join time</th>
                                            <th className="text-center">Delete user</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.showUsers.map(this.renderUser)}
                                    </tbody>
                                    </ReactBootStrap.Table>
                                </div>
                        <div className="container" style={{borderTop: "4px solid black"}}>
                        <div className="jumbotron mt-5" style={{background: "white"}}>
                            <form>
                                <h1 className="text-center" >Change User Role</h1>
                                <div className="form-group text-align-center text-center ">
                                    <label htmlFor="email">Email</label>
                                    <input type="email"
                                    autoComplete="off"
                                    className={
                                        this.hasError("email")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                    name="email"
                                    placeholder="Enter last name"
                                    required
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("email") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                        >
                                    Email is invalid or missing
                                </div>
                                </div>
                                <div className="form-group text-align-center text-center">
                                    <label htmlFor="role">Role</label>
                                    <input type="text"
                                    autoComplete="off"
                                    className={
                                        this.hasError("role")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                    name="role"
                                    placeholder="Enter role"
                                    required
                                    value={this.state.role}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("role") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter a correct user role
                                </div>
                                </div>
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
                                    Change user role
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangeUserRole
