import React, {Component} from 'react'

class LabErrors extends Component {
    render() {
        return (
            <div className="container" style={{height:"100%", minHeight:700}}>
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <h1 className="h3 mb-3 font-weight-normal">
                            Please fill all the fields to be able to register
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default LabErrors
