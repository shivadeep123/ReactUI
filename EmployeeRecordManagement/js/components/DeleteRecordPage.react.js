import React, {Component} from 'react';
import {Button, ModalTitle} from 'react-bootstrap';
import { connect } from "react-redux";

export default class DeleteRecordPage extends Component{
  render(){
   return(
     <div>
       <div>Do you want to delete the record?</div> 
      <div>
      <Button type="button" bsStyle="primary" onClick={() => this.proceed()}>Add</Button>
      <Button type="button" bsStyle="primary" onClick={() => this.cancel()}>Update</Button>
      </div>
    </div>)
  }
}
export function proceed(){
  console.log("proceed")
}

export function cancel(){
  console.log("cancel")
  this.props.dispatch(toggleModalFalse());
}
function select(state) {
  return {
    data: state
  };
}

export default connect(select)(DeleteRecordPage);
 

 


 

 