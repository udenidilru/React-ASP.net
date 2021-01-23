import React,{ Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {
    constructor(props){
        super(props);
        this.state = {emps:[], addModalShow: false, editModalShow: false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('https://localhost:44303/api/Employee')
        .then(response=> response.json())
        .then(data => {
            this.setState({emps:data})
        })
    }

    componentDidUpdate(){
        this.refreshList();
    }
    deleteEmp(empid){
        if(window.confirm('Are you sure?'))
        {
            fetch('https://localhost:44303/api/Employee/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        
        const {emps, empid, empname} = this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>EmployeeID</th>
                        <th>EmployeeName</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {emps.map(emp=>
                        <tr key={emp.EmployeeID}>
                        <td>{emp.EmployeeID}</td>
                        <td>{emp.EmployeeName}</td>
                        <td>
                            <ButtonToolbar>
                                <Button
                                className="mr-2" variant="info"
                                onClick={()=>this.setState({editModalShow:true, empid:emp.EmployeeID, empname:emp.EmployeeName})}
                                >Edit</Button>

                            <Button
                                className="mr-2" variant="danger"
                                onClick={()=> this.deleteEmp(emp.EmployeeID)}
                                >Delete</Button>

                                <EditEmpModal
                                show = {this.state.editModalShow}
                                onHide = {editModalClose}
                                empid = {empid}
                                empname = {empname}
                                />
                                
                            </ButtonToolbar>
                        </td>
                        </tr>)}
                </tbody>
            </Table>
            
            
            <ButtonToolbar>
                <Button varient="primary" onClick={()=> this.setState({addModalShow: true})}>
                    ADD Employee
                </Button>
                <AddEmpModal show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
            </div> 
        )
    }
    
}