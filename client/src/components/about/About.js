import React, { Component} from "react";
import axios from 'axios';

class About extends Component {
    constructor () {
        super()
        this.state = {
        categories: [],
        }
    }

    componentDidMount() {
        axios.get("/lab/category/showCategory",
            {mode: 'cors', 'Cache-Control': 'no-cache'}
        )
        .then(res => {
            console.log(res)
            this.setState({categories: res.data})
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
                    <h3 className="text-center">
                        Categories
                    </h3>
                    <table className="table">
                        <tr className="text-center">
                            { this.state.categories.map(category =>
                                <td>
                                    <a href={`/category-show/${category.id}`}>{category.id}</a>
                                </td>
                            )}
                        </tr>
                    </table>
                </div>
                </div>
            </div>
        );
    }
}

export default About;

