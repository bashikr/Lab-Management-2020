import React, { Component} from "react";
import axios from 'axios';

class ChangeShow extends Component {
    constructor () {
        super()
        this.state = {
        category: "",
        items: []
        }
    }

    componentDidMount() {
        axios.get(`/lab/category/category-show/${this.props.match.params.id}`)
        .then(res => {
            console.log(res)
            this.setState({items: res.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="jumbotron mt-5" style={{background: "white"}}>
                    <div className="table-responsive">
                                <h3 className="text-center">Categories</h3>
                        <table className="table mt-5">
                            <tr className="text-center">
                            { this.state.items.map(item => <td>{item.itemsId}</td>)}
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
          );
      }
    }

export default ChangeShow;
