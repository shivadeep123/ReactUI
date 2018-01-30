/**
 *
 * Nav.react.js
 *
 * This component renders the navigation bar
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import LoadingButton from './LoadingButton.react';
import ButtonToolbar, {Button} from "react-bootstrap";
import { connect } from 'react-redux';
import Modal from "./Modal.react";
import RegisterPage from "./pages/RegisterPage.react";
import AddRecordPage from "./AddRecordPage.react";
import UpdateRecordPage from "./UpdateRecordPage.react";
import DeleteRecordPage from "./DeleteRecordPage.react";
import { toggleModalTrue, toggleModalFalse, logout } from '../actions/AppActions';
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table';


export default class NavProfile extends Component {
 
  render() {
   
    const dispatch = this.props.dispatch;
    const { formState, currentlySending,isOpen,profileData } = this.props.data;
    

    // Render either the Log In and register buttons, or the logout button
    // based on the current authentication state.
    const navButtons = 
       ( <div>
        <Button type="button" bsStyle="primary" onClick={() => this.openAddModal()}>Add</Button>
        <Button type="button" bsStyle="primary" onClick={() => this.openUpdateModal()}>Update</Button>
        <Button type="button" bsStyle="primary" onClick={() => this.openDeleteModal()}>Delete</Button>   
        <Button type="button" bsStyle="primary" ><Link to="/metrics" style={{color:'white',textDecoration:'none'}}>Metrics</Link></Button> 
        <Button type="button" bsStyle="primary" ><Link to="/employeepage" style={{color:'white',textDecoration:'none'}}>Employee Skill Tracker </Link></Button>
        <Button type="button" bsStyle="primary" ><Link to="/profilepage" style={{color:'white',textDecoration:'none'}}>Employee Profiles </Link></Button>
        <Button type="button" bsStyle="primary" ><Link to="/dowloadskillgap" style={{color:'white',textDecoration:'none'}}>Employee SKill Gap </Link></Button>    
        {/* <Button type="button" bsStyle="primary" ><a style={{color:'white',textDecoration:'none'}} href="http://localhost:8081/">Load Data</a></Button>       */}
        <Button type="button" bsStyle="primary" onClick={() => this.logout()}>Log out</Button>
      </div>
      );
     
    return(
      <div className="nav">
        <div className="nav__wrapper">
          <Link to="/" className="nav__logo-wrapper"><img className="nav__logo" src="https://lh3.googleusercontent.com/zf6-5u_6u8pDbUdfhyba00JLZUrqAVZ6gQ3VbkjwQAvrmjky64KMplR9PaYEW_0m_5Q=w300" width='70px' height='70px'></img></Link>
          <div>
        </div>        
           { navButtons }           
        </div>
      </div>
    );
  }
  openAddModal() {
    this.props.dispatch(toggleModalTrue('Add'))
  }

  openUpdateModal() {
    const {profileData, isRecordSelected} = this.props.data;
    if(profileData.objects!=null)
    {
    if(isRecordSelected)
    this.props.dispatch(toggleModalTrue('Update'))
    else
    alert("No record is selected")
    }
    else{
      alert("There are no records");
    }
  }

  openDeleteModal() {
    const {profileData, isRecordSelected} = this.props.data;
    if(profileData.objects!=null)
    {
    if(isRecordSelected)
    this.props.dispatch(toggleModalTrue('Delete'))
    else
    alert("No record is selected");  
    }
    else{
      alert("There are no records")
    }
  }
  
  logout(){
    this.props.dispatch(logout())
  }
}
function select(state) {
  return {
    data: state
  };
}

export default connect(select)(NavProfile);
