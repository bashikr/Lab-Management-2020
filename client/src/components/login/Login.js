import React, {Component} from 'react'
import {login} from "../userFunctions/UserFunctions"
import styles from "../register/Register.module.scss"

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: [],
            currentUserId: ""
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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


    onSubmit (e) {
        e.preventDefault()
        var errors = [];

        if (this.state.password === "" || this.state.password.length < 6) {
            errors.push("password");
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
            password: this.state.password,
        }

        
        login(user).then(res => {
            if(res != undefined) {
                this.props.history.push(`/`)
                window.location.reload();
            } else {
                this.props.history.push(`/register`)
                window.location.reload();
    
            }
        })
    }

    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    <div className="row">
                        <div className="col-md-10 mt-5 mx-auto " >
                            <form >
                                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email"
                                    autoComplete="off"
                                className={
                                    this.hasError("email")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("email") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                        >
                                    Email is either invalid or missing
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
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    />
                                <div
                                    className={
                                        this.hasError("password") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                        >
                                    Password is either invalid or missing
                                </div>
                                </div>
                                <button type="submit" onClick={this.onSubmit}
                                    className="btn btn-lg btn-primary btn-block"
                                    style={{
                                        background: "#5bc0e8", width: "40%", margin: "auto",
                                        fontWeight: "bold", color: "black",
                                        borderRadius: "20", borderStyle: "none"
                                    }}
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
