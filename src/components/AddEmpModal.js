import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormControl} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddEmpModal extends Component {
    constructor(props){
        super(props);

        this.state = {Snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) =>{
      this.setState({snackbaropen:false});
    };

    handleSubmit(event){
      event.preventDefault();
      fetch('https://localhost:44303/api/Employee',{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          EmployeeID: null,
          EmployeeName: event.target.EmployeeName.value
        })
      })
      .then(res=> res.json())
      .then((result)=>
      {
        this.setState({snackbaropen:true, snackbarmsg:result});
      },
      (error)=>{
        this.setState({snackbaropen:true, snackbarmsg:'Failed'});
      }
      )
    }

    render(){
        return(
          <div className="container">
          <Snackbar
          anchorOrigin={{vertical:'center',horizontal:'center'}}
          open = {this.state.snackbaropen}
          autoHideDuration = {3000}
          onClose={this.snackbarClose}

          message = {<span id="message-id">{this.state.snackbarmsg}</span>}
          action ={[
            <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={this.snackbarClose}
            > X </IconButton>
          ]}
          ></Snackbar>


            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
            
            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="EmployeeName">
                            <Form.Label>Employee Name</Form.Label>
                            <FormControl
                            type="text"
                            name="EmployeeName"
                            required
                            placeholder="EmployeeName"
                            >
                            </FormControl>
                        </Form.Group>
                        <Form.Group>
                          <Button variant="primary" type="submit">
                            Add Employee
                          </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
        );
    }
}