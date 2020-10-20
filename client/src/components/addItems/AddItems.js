import React, {Component} from 'react'
import axios from 'axios';
import {Form, Button} from 'react-bootstrap'
import {add_items} from "../userFunctions/UserFunctions"
import styles from "../register/Register.module.scss";

class AddItems extends Component {
    constructor() {
        super()
        this.state = {
            a_id: "",
            a_amount: "",
            a_picturelink: "",
            a_description: "",
            a_productcode: "",
            a_category_id: "",
            a_shelf_place: "",
            a_shelf_amount: "",
            createdItems: [],
            errors: [],
            categories: [],
            shelves: [],
            bringIdfromItemsTable: []
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
        axios.get("/lab/category/showCategory", {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(res => {
            console.log(res)
            this.setState({categories: res.data})
        })
        .catch(error => {
            console.log(error)
        })
        axios.get("/lab/category/showShelf", {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(res => {
            console.log(res)
            this.setState({shelves: res.data})
        })
        .catch(error => {
            console.log(error)
        })
        axios.get("/lab/items/showItems", {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(res => {
            console.log(res)
            this.setState({bringIdfromItemsTable: res.data})
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
        var errors = [];

        this.state.bringIdfromItemsTable.map(idItem => {
            console.log("my ids", idItem.id)
            if (this.state.a_id === "" || this.state.a_id ==idItem.id || this.state.a_id.includes("#")) {
                errors.push("a_id");
            }
        })

        if (this.state.a_amount === "") {
            errors.push("a_amount");
        }
        if (this.state.a_picturelink === "") {
            errors.push("a_picturelink");
        }
        if (this.state.a_description === "") {
            errors.push("a_description");
        }

        if (this.state.a_category_id === "") {
            errors.push("a_category_id");
        }
        if (this.state.a_shelf_place === "") {
            errors.push("a_shelf_place");
        }
        if (this.state.a_shelf_amount === "" || this.state.a_shelf_amount > this.state.a_amount) {
            errors.push("a_shelf_amount");
        }

        this.state.bringIdfromItemsTable.map(idItem => {
            if (this.state.a_productcode === "" || this.state.a_productcode ==idItem.productcode) {
                errors.push("a_productcode");
            }
        })

        this.setState({
            errors: errors
        });

        if (errors.length > 0) {
            return false;
        } else {
            alert("everything good. submit form!");
        }

        this.componentDidMount()
        const newItem = {
            a_id: this.state.a_id,
            a_amount: this.state.a_amount,
            a_picturelink: this.state.a_picturelink,
            a_description: this.state.a_description,
            a_productcode: this.state.a_productcode,
            a_category_id: this.state.a_category_id,
            a_shelf_place: this.state.a_shelf_place,
            a_shelf_amount: this.state.a_shelf_amount
        }

        add_items(newItem).then(res => {
            console.log("This is res from register", res)
        })
        this.props.history.push(`/`)
    }

    render() {
        return (
            <div>
                <div className="container" style={{height:"100%", minHeight:700}}>
                <br></br>
                <br></br>
                    <div className="jumbotron mt-5" style={{background: "white"}}>
                        <Form.Group method="post" >
                                <legend>Add New Item</legend>
                                <label for="a_id">Item name</label>
                                <Form.Control id="a_id" type="text" name="a_id" 
                                value={this.state.a_id}
                                onChange={this.onChange}
                                className={
                                    this.hasError("a_id")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                />
                                <div
                                    className={
                                        this.hasError("a_id") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter the item's wished id. This id must be unique and not includes
                                    symbols so be aware of not using an already existed id. 
                                </div>
                                <label for="a_amount">Amount</label>
                                <Form.Control id="a_amount" type="number" name="a_amount" 
                                value={this.state.a_amount}
                                onChange={this.onChange}
                                className={
                                    this.hasError("a_amount")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                />
                                <div
                                    className={
                                        this.hasError("a_amount") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter the quantity of this item
                                </div>
                                <label for="a_picturelink">Picture link</label>
                                <Form.Control id="a_picturelink" type="text" name="a_picturelink" 
                                value={this.state.a_picturelink}
                                placeholder="/img/lab/picture.png"
                                onChange={this.onChange}
                                className={
                                    this.hasError("a_picturelink")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                />
                                <div
                                    className={
                                        this.hasError("a_picturelink") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter the item's picture link
                                </div>
                                <label for="a_description">Description</label>
                                <Form.Control id="a_description" type="text" name="a_description" 
                                value={this.state.a_description}
                                onChange={this.onChange}
                                className={
                                    this.hasError("a_description")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                />
                                <div
                                    className={
                                        this.hasError("a_description") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please give a short description about the item
                                </div>

                                <label for="a_productcode">Item Code</label>
                                <Form.Control id="a_productcode" type="text" name="a_productcode" 
                                value={this.state.a_productcode}
                                onChange={this.onChange}
                                className={
                                    this.hasError("a_productcode")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                />
                                <div
                                    className={
                                        this.hasError("a_productcode") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter the specific item's parcode
                                </div>

                                <div className="form-group">
                                    <label for="a_category_id">The item's Category</label>
                                    <select name="a_category_id" id="a_category_id"
                                    onChange={this.onChange}
                                    // value={this.state.a_category_id}
                                    className={
                                        this.hasError("a_category_id")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                    }
                                    >
                                    <option></option>
                                     { this.state.categories.map((category) => {
                                        
                                        return (
                                                <option value={category.id}>
                                                    {category.id}
                                                </option>
                                            )
                                        }
                                    )}
                                    </select>
                                    <div
                                        className={
                                            this.hasError("a_category_id") ? styles.inlinErrorMsg : styles.hidden
                                        }
                                    >
                                        Please enter the category of the item
                                    </div>
                                </div>

                                <label for="a_shelf_place">Item's Storing Place</label>
                                <select name="a_shelf_place" id="a_shelf_place"
                                value={this.state.a_shelf_place}
                                onChange={this.onChange}
                                className={
                                    this.hasError("a_shelf_place")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                >
                                <option></option>
                                    { this.state.shelves.map((shelf) => {
                                    
                                    return (
                                            <option value={shelf.id}>
                                                {shelf.id}
                                            </option>
                                        )
                                    }
                                )}
                                </select>
                                <div
                                    className={
                                        this.hasError("a_shelf_place") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter the whished place for storing the items.
                                </div>
                                <label for="a_shelf_amount">Item's amount per shelf</label>
                                <Form.Control id="a_shelf_amount" type="number" name="a_shelf_amount" 
                                value={this.state.a_shelf_amount}
                                onChange={this.onChange}
                                placeholder="self amount should not exceed the added amount!"
                                className={
                                    this.hasError("a_shelf_amount")
                                    ? "form-control is-invalid"
                                    : "form-control"
                                }
                                />
                                <div
                                    className={
                                        this.hasError("a_shelf_amount") ? styles.inlinErrorMsg : styles.hidden
                                    }
                                >
                                    Please enter the amount of items for the specific shelf/place
                                </div>
                                &ensp;
                                <Button type="submit" onClick={this.onSubmit}
                                name="doit"
                                value="Create"
                                className="btn btn-lg btn-primary btn-block"
                                style={{background: "#5bc0e8", width: "40%", margin: "auto",
                                    fontWeight: "bold",
                                    color: "black",
                                    borderRadius: "20",
                                    borderStyle: "none"
                                }}
                                >Create</Button>
                        </Form.Group>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddItems
