import React, {Component} from 'react'
import * as ReactBootStrap from 'react-bootstrap'
import axios from 'axios';

class SearchItems extends Component {
    constructor() {
        super()
        this.state = {
           search: "",
           searchItems: [],
           items: []
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

    onSubmit (e) {
        e.preventDefault()
        this.componentDidMount()
    }

    componentDidMount() {
        axios.get("/lab/items/showItems", {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(res => {
            this.setState({items: res.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
        axios.get("/lab/items/searchItems", {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(res => {
            this.setState({searchItems: res.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    renderSearchResult(item, index) {
        return(
                <tr key={index}>
                <td class="w-25">
                    <img class="img-fluid img-thumbnail" src={`${item.picturelink}`}/>
                </td>
                <td>
                    <a href={`/item-show/${item.id}`}>
                        {item.id}
                    </a>
                </td>
            </tr>
        )
    }

    render() {
        let filteredItems = this.state.items.filter(
            (item) => {
                return item.id.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return (
            <div className="container">
                <div className="jumbotron mt-5 " style={{background: "white"}}>
                    <div className="col-md-15 mx-auto">
                        <h1 className="text-center"
                            style={{fontSize: "2.8vw", fontWeight: "bold"}}>Lab Management Search
                        </h1>
                        <form   className="form-inline " method="get"
                            onClick={this.onSubmit}
                        >
                        <input className="form-control form-control-sm  w-50" type="text" placeholder="Search"
                            aria-label="Search"
                            name="search"
                            style={{margin: "5% auto", padding: 20,
                            borderRadius: "2%"}}
                            value={this.state.search}
                            onChange={this.onChange}
                        />
                        </form>

                        <ReactBootStrap.Table className="table table-image" >
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" >Picture</th>
                                    <th scope="col">Product Name</th>
                                </tr>
                            </thead>
                            <tbody >
                                {filteredItems.map((item) => {
                                    return(
                                        <div>
                                            <td className="w-25">
                                                <img 
                                                    style={{width: "500px"}}
                                                    className="img-fluid img-thumbnail"
                                                    src={`${item.picturelink}`}
                                                />
                                            </td>
                                            <td>
                                                <a href={`/showItems/${item.id}`}>{item.id}</a>
                                                <br></br>
                                                {item.description}
                                            </td>
                                        </div>
                                    )
                                })}
                            </tbody>
                        </ReactBootStrap.Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchItems
