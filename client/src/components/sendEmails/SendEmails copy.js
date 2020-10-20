import React, {Component} from 'react'
import {sendEmail} from "../userFunctions/UserFunctions"
import styles from "../register/Register.module.scss";

class SendEmails extends Component {
    constructor() {
    super()
    this.state = {
        from: '',
        to: '',
        subject: '',
        text: '',
        errors: []
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

    onSubmit(e) {
        e.preventDefault()
        var errors = [];

        if (this.state.subject === "") {
            errors.push("subject");
        }
        if (this.state.text === "") {
            errors.push("text");
        }

        const expression = /\S+@\S+/;
        var validEmailReceiver = expression.test(String(this.state.to).toLowerCase());
        var validEmailSender = expression.test(String(this.state.from).toLowerCase());

        if (!validEmailSender) {
            errors.push("from");
        }
        if (!validEmailReceiver) {
            errors.push("to");
        }

        this.setState({
            errors: errors
        });

        if (errors.length > 0) {
            return false;
        } else {
            alert("everything good. submit form!");
        }

        const newEmail = {
            from: this.state.from,
            to: this.state.to,
            subject: this.state.subject,
            text: this.state.text,
        }

        sendEmail(newEmail).then(res => {
            window.location.reload();
        })
    }

    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    <div className="row">
                        <div className="col-md-10 mt-5 mx-auto " >
                            <h1 className="h3 mb-3 font-weight-normal"> Send Email</h1>
                            <form >
                                <label for="to"> to </label>
                                <input type="email"
                                autoComplete="off"
                                className={
                                this.hasError("to")
                                ? "form-control is-invalid"
                                : "form-control"
                                }
                                name="to"
                                placeholder="Enter First name"
                                value={this.state.to}
                                onChange={this.onChange}
                                />
                                <div
                                    className={
                                        this.hasError("to") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                Please enter your first name
                                </div>

                                <label for="from"> from </label>
                                <input type="email"
                                autoComplete="off"
                                className={
                                this.hasError("from")
                                ? "form-control is-invalid"
                                : "form-control"
                                }
                                name="from"
                                placeholder="Enter First name"
                                value={this.state.from}
                                onChange={this.onChange}
                                />
                                <div
                                    className={
                                        this.hasError("from") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                Please enter your first name
                                </div>
                                <label for="subject"> Subject </label>
                                <input type="text"
                                autoComplete="off"
                                className={
                                this.hasError("subject")
                                ? "form-control is-invalid"
                                : "form-control"
                                }
                                name="subject"
                                placeholder="Enter First name"
                                value={this.state.subject}
                                onChange={this.onChange}
                                />
                                <div
                                    className={
                                        this.hasError("subject") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                Please enter your first name
                                </div>
                                <label for="text"> Message </label>
                                <textarea
                                type="text"
                                autoComplete="off"
                                className={
                                this.hasError("text")
                                ? "form-control is-invalid"
                                : "form-control"
                                }
                                name="text"
                                placeholder="Enter First name"
                                value={this.state.text}
                                onChange={this.onChange}
                                />
                                <div
                                    className={
                                        this.hasError("text") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                Please enter your first name
                                </div>
                                <button type="submit" onClick={this.onSubmit} className="btn btn-lg btn-primary btn-block"
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

export default SendEmails
