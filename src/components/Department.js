import React,{ Component } from "react";

export class Department extends Component {

    constructor(props){
        super(props);
        this.state = {deps:[]}
    }

    render(){
        return(
            <div className="mt-5 d-flex justify-content-left">
                <h3>Department Page</h3>
            </div>
        )
    }
}