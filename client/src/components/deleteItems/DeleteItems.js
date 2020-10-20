import React, {Component} from 'react'
import axios from 'axios';
import {Form, Button} from 'react-bootstrap'
import styles from "../register/Register.module.scss";

class DeleteItems extends Component {
    constructor() {
        super()
        this.state = {
            a_id: "",
            a_productcode: "",
            createdItems: [],
            errors: [],
            allItems: []
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        var key = e.target.name;
        var value = e.target.value;
        var obj = {};
        obj[key] = value;
        this.setState(obj);
    }

    componentDidMount() {
        axios.get("/lab/items/showItems", {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(res => {
            console.log(res)
            this.setState({allItems: res.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    onSubmit(e) {
        e.preventDefault()
        this.componentDidMount()
        const newItem = {
            a_id: this.state.a_id,
            a_productcode: this.state.a_productcode,
        }
        axios.get(`/lab/items/deleteAnItem/${this.state.a_id}`,
            {mode: 'cors', 'Cache-Control': 'no-cache'}
        )
        .then(res => {
            console.log(res)
            this.setState({allItems: res.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
        this.props.history.push(`/`)
    }

    render() {
        return (
            <div>
                <div className="container" style={{height:"100%", minHeight:700}}>
                    <br></br><br></br>
                    <div className="jumbotron mt-5" style={{background: "white"}}>
                        <Form.Group method="post" >
                                <legend>Delete Items</legend>

                                <label for="a_id">Choose a item to remove</label>
                                <select name="a_id" id="a_id"
                                    value={this.state.a_id}
                                    onChange={this.onChange}
                                    className={
                                        this.hasError("a_id")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                >
                                    <option></option>
                                        { this.state.allItems.map((item) => {
                                            return (
                                                <option value={item.id}>
                                                item name ({item.id }) -------------> item code ({item.productcode})
                                                </option>
                                            )
                                        }
                                    )}
                                </select>
                                <div
                                    className={
                                        this.hasError("a_id") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter the whished place for storing the items.
                                </div>
                               
                                <Button type="submit" onClick={this.onSubmit}
                                    name="doit"
                                    value="Create"
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
                                    Delete
                                </Button>
                        </Form.Group>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteItems
