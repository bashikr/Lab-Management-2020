import React, {Component} from 'react'
import styles from "./Register.module.scss";
import {register} from "../userFunctions/UserFunctions"
import '@formatjs/intl-datetimeformat/locale-data/sv' // locale-data for sweden
import axios from 'axios';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            address: '',
            postnumber: '',
            city: '',
            country: '',
            phonenumber: '',
            birthday: '',
            role: 'user',
            email: '',
            password: '',
            errors: [],
            userEmail: []
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

            this.setState({userEmail: res2})
            this.setState({showUsers: res.data})
        })
        .catch(error => {
            console.log(error)
        })
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

        if (this.state.first_name === "") {
            errors.push("first_name");
        }
        if (this.state.last_name === "") {
            errors.push("last_name");
        }
        if (this.state.city === "") {
            errors.push("city");
        }
        if (this.state.country === "") {
            errors.push("country");
            }
        if (this.state.address === "") {
            errors.push("address");
        }
        if (this.state.phonenumber === "") {
            errors.push("phonenumber");
        }
        if (this.state.postnumber === "") {
            errors.push("postnumber");
        }
        if (this.state.birthday === "") {
            errors.push("birthday");
        }
        if (this.state.password === "" || this.state.password.length < 6) {
            errors.push("password");
        }

        const expression = /\S+@\S+/;
        var validEmail = expression.test(String(this.state.email).toLowerCase());

        this.state.userEmail.forEach(item => {

            if (item.email != this.state.email) {
                return this.state.email
            } else if (item.email === this.state.email) {
                errors.push("email")
            }
        })

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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            address: this.state.address,
            postnumber: this.state.postnumber,
            city: this.state.city,
            country: this.state.country,
            phonenumber: this.state.phonenumber,
            birthday: this.formatter.format(Date.parse(this.state.birthday)),
            role: this.state.role,
            email: this.state.email,
            password: this.state.password
        }

        register(user).then(res => {
            this.props.history.push(`/login`)
        })
    }

    formatter = new Intl.DateTimeFormat("sv", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    })

    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    <div className="row">
                        <div className="col-md-10 mt-5 mx-auto">
                            <form >
                                <h1 className="h3 mb-3 font-weight-normal text-center">Please sign up</h1>
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input type="text"
                                    autoComplete="off"
                                className={
                                    this.hasError("first_name")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                    name="first_name"
                                    placeholder="Enter First name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}
                                    />
                                    <div
                                        className={
                                            this.hasError("first_name") ? styles.inlinErrorMsg : styles.hidden
                                        }
                                    >
                                    Please enter your first name
                                </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input type="text"
                                    autoComplete="off"
                                    className={
                                        this.hasError("last_name")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                    name="last_name"
                                    placeholder="Enter last name"
                                    required
                                    value={this.state.last_name}
                                    onChange={this.onChange}
                                    />
                                    <div
                                        className={
                                            this.hasError("last_name") ? styles.inlinErrorMsg : styles.hidden
                                        }
                                    >
                                        Please enter a your last name
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text"
                                    autoComplete="off"
                                    className={
                                    this.hasError("address")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                    required
                                    name="address"
                                    placeholder="Enter your address"
                                    value={this.state.address}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("address") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                        >
                                    Please enter a your address
                                </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="postnumber">Post Number</label>
                                    <input type="text"
                                    autoComplete="off"
                                    className={
                                    this.hasError("postnumber")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                    name="postnumber"
                                    placeholder="Enter post number"
                                    required
                                    value={this.state.postnumber}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("postnumber") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter a your post number
                                </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text"
                                    autoComplete="off"
                                    className={
                                    this.hasError("city")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                    name="city"
                                    placeholder="Enter city"
                                    required
                                    value={this.state.city}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("city") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter a your city
                                </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country</label>
                                    <input type="text"
                                    autoComplete="off"
                                    className={
                                    this.hasError("country")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                    name="country"
                                    placeholder="Enter country"
                                    required
                                    value={this.state.country}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("country") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter a your country
                                </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phonenumber">Your Phone Number</label>
                                    <input type="text"
                                    autoComplete="off"
                                    className={
                                    this.hasError("phonenumber")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                    name="phonenumber"
                                    placeholder="Enter your phone number"
                                    required="required"
                                    value={this.state.phonenumber}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("phonenumber") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter a your phone number
                                </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="birthday" id="birthday">Date of birth</label>
                                    <input type="date"
                                    autoComplete="off"
                                    className={
                                    this.hasError("birthday")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                    name="birthday"
                                    placeholder="Enter your birthday"
                                    required ="true"
                                    value={this.state.birthday}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("birthday") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter a your birthday
                                </div>
                                </div>

                                <div className="form-group">
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
                                    Email either invalid, missing, or already registered
                                </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                    autoComplete="off"
                                    className={
                                    this.hasError("password")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("password") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter a password of 6 characters
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
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
