import React, {Component} from 'react'
import {sendEmail} from "../userFunctions/UserFunctions"

class SendEmails extends Component {
    constructor() {
        super();
        this.state = {
            from: '',
            to: '',
            subject: '',
            text: ''
        };
    }

    componentDidMount() {
        const newEmail = {
            from: this.state.from,
            to: this.state.to,
            subject: this.state.subject,
            text: this.state.text,
        }

        sendEmail(newEmail).then(res => {
        })
    }

    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    <div className="row">
                        <div className="col-md-10 mt-5 mx-auto " >
                            <h1 className="h3 mb-3 font-weight-normal"> Send Email</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SendEmails
