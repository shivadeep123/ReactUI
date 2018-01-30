import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, striped, hover, condensed, bordered } from "react-bootstrap-table";
import { Table } from "react-bootstrap";
import fs from "fs";
import NavProfile from "../NavProfile.react";
import Modal from "../Modal.react";
import RegisterPage from "../pages/RegisterPage.react";
import AddRecordPage from "../AddRecordPage.react";
import UpdateRecordPage from "../UpdateRecordPage.react";
import { toggleModalTrue, toggleModalFalse, allData, deleteProfileRecord, changeUpdateProfileForm, isRecordSelected} from '../../actions/AppActions';
import { DeleteRecordPage } from "../DeleteRecordPage.react";
import { Button } from "react-bootstrap";
import { browserHistory } from "react-router";
import xls from "xlsx";
import {ProfileData} from "../../../profiledata";
const assign = Object.assign || require('object.assign');
export default class EmployeeProfile extends Component{
    
      componentDidMount(){      
        this.allData();
     }
   
    handleAfterSearch = (searchText, result) => {
        if (searchText === '') {
          this.refs.table.cleanSelected();
          this.rowEmail=''
        }
    }
    createCustomSearchField = (props) => {
        return (
          <SearchField
            className='my-custom-class'
            defaultValue={ props.defaultSearch }
            placeholder={ props.searchPlaceholder }/>
        );
      }
    allData = () => {
        console.log("inside >>> EmployeeProfile >>> allData")
        this.props.dispatch(allData());
    }
    proceed =() =>{
        console.log("inside >>> EmpProf >>> delete >>>proceed "+this.rowEmail);
        if(this.rowEmail == ''){
            alert("No record is selected for deletion")
        }
        else{
        this.props.dispatch(deleteProfileRecord(this.rowEmail));
        }
    }
    cancel =() =>{
        this.props.dispatch(toggleModalFalse());
    }
   
   
    _mergeWithCurrentState(change) {
       const {updateProfileFormState} = this.props.data;
     //  console.log("inside EmpProf >>> _merge >>> this.props.data >>>before assign"+JSON.stringify(updateProfileFormState));
    // console.log("inside EmpoProf >>> merge >>> after assign >>> "+JSON.stringify(assign(updateProfileFormState, change)))

        return assign(updateProfileFormState, change);
        
      }
      _emitChange(newState) {
        this.props.dispatch(changeUpdateProfileForm(newState));
      }

      handleChange(selectorFiles)
      {
          console.log(selectorFiles);
      }
    rowEmail=''
    rowStr=''

    onRowSelect(row, isSelected, e, rowIndex){
        
       let rowStr = '';

       this.props.dispatch(isRecordSelected());
       for (const prop in row) {
            if(prop =="firstName")
            {
            var newState = this._mergeWithCurrentState({
                firstName: row[prop]
            });
            this._emitChange(newState);
            console.log("Inside EmployeeProfile class >>> function onRowSelect "+row[prop]);
            }          
           else
           if(prop == "email")
           {
               this.rowEmail = row[prop];
               console.log(this.rowEmail);
                var newState = this._mergeWithCurrentState({
                    email: row[prop]
                });
              this._emitChange(newState);
           }
           else
           if(prop =="lastName")
           {
            var newState = this._mergeWithCurrentState({
                lastName: row[prop]
              });
              this._emitChange(newState);
           }
           else
           if(prop =="project")
           {
            var newState = this._mergeWithCurrentState({
                project: row[prop]
              });
              this._emitChange(newState);
           }
           else
           if(prop =="releaseDate")
           {
            var newState = this._mergeWithCurrentState({
                releaseDate: row[prop]
              });
              this._emitChange(newState);
           }
           else
           if(prop =="primarySkills")
           {
            var newState = this._mergeWithCurrentState({
                primarySkills: row[prop]
              });
              this._emitChange(newState);
           }
           else
           if(prop =="secondarySkills")
           {
            var newState = this._mergeWithCurrentState({
                secondarySkills: row[prop]
              });
              this._emitChange(newState);
           }
           else
           if(prop =="yearsOfExperience")
           {
            var newState = this._mergeWithCurrentState({
                yearsOfExperience: row[prop]
              });
              this._emitChange(newState);
           }
           else
           if(prop =="trainings")
           {
            var newState = this._mergeWithCurrentState({
                trainings: row[prop]
              });
              this._emitChange(newState);
           }
           else
           if(prop =="qualification")
           {
            var newState = this._mergeWithCurrentState({
                qualification: row[prop]
              });
              this._emitChange(newState);
           }
           else
           if(prop =="mobileNo")
           {
            var newState = this._mergeWithCurrentState({
                mobileNo: row[prop]
              });
              this._emitChange(newState);
           }
         
          }
       }

       isExpandableRow(row) {
        if (row.id < 2) return true;
          else return false;
      }
       
    render(){

        const dispatch = this.props.dispatch;
        const { formState, currentlySending,isOpenUpdateRecord, isOpenDeleteRecord, isOpenAddRecord, profileData } = this.props.data;
        console.log("inside EmpProf >>> render >>> "+JSON.stringify(profileData));
        const options = {
            clearSearch: true,
            searchField: this.createCustomSearchField,
            afterSearch: this.handleAfterSearch
          };

        var selectRowProp = {
            mode: "radio",
            onSelect: this.onRowSelect.bind(this),
        };

        return(
            <div>
                <NavProfile/>  
                <div className="container__profile-data">
                    <div className="profile-data">                  
                        <BootstrapTable ref='table' data={profileData.objects} selectRow={selectRowProp} 
                            pagination={true} options={options} search={true} select striped hover condensed
                          >
                            <TableHeaderColumn dataField='firstName' width='200px'>FirstName</TableHeaderColumn>
                            <TableHeaderColumn dataField='lastName' width='200px'>LastName</TableHeaderColumn>
                            <TableHeaderColumn dataField='project' width='200px'>Project</TableHeaderColumn>
                            <TableHeaderColumn dataField='releaseDate' width='200px'>Release Date</TableHeaderColumn>
                            <TableHeaderColumn dataField='primarySkills' width='200px'>Primary skills</TableHeaderColumn>
                            <TableHeaderColumn dataField='secondarySkills' width='200px'> dataAlign='center'>Secondary skills</TableHeaderColumn>
                            <TableHeaderColumn dataField='yearsOfExperience' width='200px'>Years of experience</TableHeaderColumn>
                            <TableHeaderColumn dataField='trainings' width='200px'>Trainings</TableHeaderColumn>
                            <TableHeaderColumn dataField='qualification' width='200px'>Qualification</TableHeaderColumn>
                            <TableHeaderColumn dataField='mobileNo' width='200px'>Mobile number</TableHeaderColumn>
                            <TableHeaderColumn dataField='email' isKey={ true } width='200px'>Email</TableHeaderColumn>
                        </BootstrapTable>
                        <Modal isOpen={isOpenAddRecord} onClose={() => closeModal()}>
                            <AddRecordPage/>        
                        </Modal>
                        <Modal isOpen={isOpenUpdateRecord} onClose={() => closeModal()}>
                            <UpdateRecordPage/>        
                        </Modal>
                        <Modal isOpen={isOpenDeleteRecord} onClose={() => closeModal()}>
                            <div className="confirm-delete">
                            <div className="confirm-delete_text">Do you want to delete the record?</div> 
                                <div className="confirm-delete_Buttons">
                                <Button type="button" bsStyle="primary" onClick={() => this.proceed()}>Proceed</Button>
                                <Button type="button" bsStyle="primary" onClick={() => this.cancel()}>Cancel</Button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }

}

export function  closeModal(){
    this.props.dispatch(toggleModalFalse());
}

function select(state) {
    return {
      data: state
    };
  }
  
export default connect(select)(EmployeeProfile);