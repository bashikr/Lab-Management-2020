import React, {Component} from "react";
import ItemsShow from '../itemsShow/ItemsShow'

class Landing extends Component {
    render() {
        return (
            <div className="container" 
                style={{height:"100%", minHeight:700, background: "white"}}
            >
                <div className="row">
                    <div class="w-100">
                        <ItemsShow />
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing
