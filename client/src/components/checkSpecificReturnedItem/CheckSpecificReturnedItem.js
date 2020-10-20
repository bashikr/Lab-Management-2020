import React, {Component} from 'react'
import axios from 'axios';
import {sendEmail} from "../userFunctions/UserFunctions"
import styles from "../register/Register.module.scss";
import jwt_decode from 'jwt-decode'

class CheckSpecificReturnedItem extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            createdOrder: [],
            showSpecificInvoice: [],
            order_id: "",
            from: '',
            to: '',
            subject: '',
            text: '',
            errors: [],
            email: '',
            showSpecificRefusedItem: []
        };
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

    componentDidMount() {
        axios.get(`/lab/returns/checkItemStatus/${this.props.match.params.id}/${this.props.match.params.status}`)
        .then(res => {
            this.setState({showSpecificInvoice: res.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
        axios.get(`/lab/returns/showReturnRequestsById/${this.props.match.params.id}`)
        .then(res => {
            this.setState({showSpecificRefusedItem: res.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            email: decoded.email
        })
    }

    render() {
        const x = this.state.showSpecificRefusedItem
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    <div className="purchase-card" >
                        {this.props.match.params.status == 0 ?
                            <div className="row">
                                <div className="col-md-10 mt-5 mx-auto " >
                                    <h1 className="h3 mb-3 font-weight-normal text-center"> Send Email</h1>
                                    <form >
                                        <label for="from"> From </label>
                                        <input type="email"
                                        placeholder={this.state.email}
                                        autoComplete="off"
                                        className={
                                        this.hasError("from")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                        }
                                        name="from"
                                        value={this.state.from}
                                        onChange={this.onChange}
                                        />
                                        <div
                                        className={
                                            this.hasError("from") ? styles.inlinErrorMsg : styles.hidden
                                        }
                                        >
                                        Please add your e-mail
                                        </div>
                                        <label for="to"> To </label>
                                        <input type="email"
                                        autoComplete="off"
                                        className={
                                        this.hasError("to")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                        }
                                        name="to"
                                        placeholder= {x.map(item => {
                                            return(item.email)
                                        })}
                                        value={this.state.to}
                                        onChange={this.onChange}
                                        />
                                        <div
                                        className={
                                            this.hasError("to") ? styles.inlinErrorMsg : styles.hidden
                                        }
                                            >
                                        Please add the receiver's e-mail
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
                                        placeholder="Add a subject"
                                        value={this.state.subject}
                                        onChange={this.onChange}
                                        />
                                        <div
                                        className={
                                            this.hasError("subject") ? styles.inlinErrorMsg : styles.hidden
                                        }
                                            >
                                        Please add a subject
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
                                        placeholder="Write your message here"
                                        value={this.state.text}
                                        onChange={this.onChange}
                                        />
                                        <div
                                        className={
                                            this.hasError("text") ? styles.inlinErrorMsg : styles.hidden
                                        }
                                            >
                                        Please add a message.
                                        </div>
                                        <button type="submit" onClick={this.onSubmit}
                                            className="btn btn-lg btn-primary btn-block"
                                            style={{background: "#5bc0e8",
                                            width: "40%",
                                            margin: "auto",
                                            fontWeight: "bold",
                                            color: "black",
                                            borderRadius: "20",
                                            borderStyle: "none",
                                            marginTop: "5%"
                                            }}
                                        >
                                            Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                        :
                        this.props.match.params.status == 1 ?
                        <h3 className="text-center">Perfect, the item will now be added to the Lab</h3> :
                        <h3 className="text-center">Not found!</h3>
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckSpecificReturnedItem
