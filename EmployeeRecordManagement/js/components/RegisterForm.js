/**
 * Form.react.js
 *
 * The form with a username and a password input field, both of which are
 * controlled via the application state.
 *
 */

import React, { Component } from 'react';
import { changeRegisterForm } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';
import ErrorMessage from './ErrorMessage.react';

// import { Form, FormControl, FormGroup, ControlLabel, Grid, Row, Col, Table, Radio, Button } from "react-bootstrap";
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class RegisterForm extends Component {
  render() {
    return(
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
      <ErrorMessage />
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" type="text" id="username" value={this.props.data.username} placeholder="Enter user name" onChange={this._changeUsername.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
        <label className="registerform__field-label" htmlFor="username">User Name</label>
      </div>
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" id="firstname" type="text" value={this.props.data.firstname} placeholder="Enter first name"  onChange={this._changeFirstName.bind(this)} />
        <label className="registerform__field-label" htmlFor="firstname">First Name</label>
      </div>
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" id="lastname" type="text" value={this.props.data.lastname} placeholder="Enter last name"  onChange={this._changeLastname.bind(this)} />
        <label className="registerform__field-label" htmlFor="lastname">Last Name</label>
      </div>
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" type="password" id="password" value={this.props.data.password} placeholder="Enter password" onChange={this._changePassword.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
        <label className="registerform__field-label" htmlFor="password">Password</label>
      </div>
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" id="confirmpassword" type="password" placeholder="Confirm passowrd"  onChange={this._changeConfirmPassword.bind(this)} />
        <label className="registerform__field-label" htmlFor="confirmpassword">Confirm Password</label>
      </div>
      <div className="registerform__field-wrapper">
       <div className="gender-in-type-wrapper-male"> <input className="registerform__field-input" type="radio" value="male" name="gender" onChange={this._changeGender.bind(this)}/><div className="gender-type">Male</div></div>
       <div className="gender-in-type-wrapper-female"><input className="registerform__field-input" type="radio"  value="female" name="gender" onChange={this._changeGender.bind(this)}/><div className="gender-type">Female</div></div>
       <label className="registerform__field-label" htmlFor="gender">Gender</label>
      </div>
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" type="date" id="dob" value={this.props.data.dob} placeholder="Enter date of birth" onChange={this._changeDob.bind(this)}/>
        <label className="registerform__field-label" htmlFor="dob">Date of birth</label>
      </div>
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" type="email" id="email" value={this.props.data.email} placeholder="Enter email" onChange={this._changeEmail.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
        <label className="registerform__field-label" htmlFor="email">Email</label>
      </div>
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" id="phonenumber" type="number" value={this.props.data.mobilenumber} placeholder="Enter phone number"  onChange={this._changePhonenumber.bind(this)} />
        <label className="registerform__field-label" htmlFor="phonenumber">Phonenumber</label>
      </div>
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" id="city" type="text" value={this.props.data.city} placeholder="Enter city name"  onChange={this._changeCity.bind(this)} />
        <label className="registerform__field-label" htmlFor="city">City</label>
      </div>
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" id="states" type="text" value={this.props.data.states} placeholder="Enter state name"  onChange={this._changeStates.bind(this)} />
        <label className="registerform__field-label" htmlFor="states">State</label>
      </div>
      <div className="registerform__field-wrapper">
        <input className="registerform__field-input" id="pincode" type="text" value={this.props.data.pincode} placeholder="Enter pincode"  onChange={this._changePincode.bind(this)} />
        <label className="registerform__field-label" htmlFor="pincode">Pincode</label>
      </div>
      <div className="registerform__submit-btn-wrapper">
        {this.props.currentlySending ? (
          <LoadingButton />
        ) : (
          <button className="registerform__submit-btn" type="submit">{this.props.btnText}</button>
        )}
      </div>
    </form>
    );
  }

  // Change the username in the app state
  _changeUsername(evt) {
    console.log("inside RegisterForm >>> changeusername >>> username "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      username: evt.target.value
    });

    this._emitChange(newState);
  }

  // Change the password in the app state
  _changePassword(evt) {
    console.log("inside RegisterForm >>> changePassword >>> password "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      password: evt.target.value
    });

    this._emitChange(newState);
  }

  _changeConfirmPassword(evt) {
    console.log("inside RegisterForm >>> confirmpassword >>> confirmpassowrd "+evt.target.value)
    // var newState = this._mergeWithCurrentState({
    //   confirmpassword: evt.target.value
    }

  //  this._emitChange(newState);
  
 // }

  // Change the firstname in the app state
  _changeFirstName(evt) {
    console.log("inside RegisterForm >>> changefirstname >>> firstname "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      firstname: evt.target.value
    });

    this._emitChange(newState);
  }

  //change the lastname in the app state
  _changeLastname(evt) {
    console.log("inside RegisterForm >>> changelastname >>> lastname "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      lastname: evt.target.value
    });

    this._emitChange(newState);
  }

  //change the dob in the app state
  _changeDob(evt) {
    console.log("inside RegisterForm >>> changedob >>> dob "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      dob: evt.target.value
    });

    this._emitChange(newState);
  }

  //change the dob in the app state
  _changeGender(evt) {
    console.log("inside RegisterForm >>> changegender >>> gender "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      gender: evt.target.value
    });

    this._emitChange(newState);
  }

  // Change the email in the app state
  _changeEmail(evt) {
    console.log("inside RegisterForm >>> changeemail >>> email "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      email: evt.target.value
    });

    this._emitChange(newState);
  }

  //change phonenumber in the app state
  _changePhonenumber(evt) {
    console.log("inside RegisterForm >>> changephonenumbe >>> mobilenumber "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      mobilenumber: evt.target.value
    });

    this._emitChange(newState);
  }

  // Change the city in the app state
  _changeCity(evt) {
    console.log("inside RegisterForm >>> changecity >>> city "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      city: evt.target.value
    });

    this._emitChange(newState);
  }

  //Change the state in the app state
  _changeStates(evt) {
    console.log("inside RegisterForm >>> changestate >>> state "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      state: evt.target.value
    });

    this._emitChange(newState);
  }

  // Change the pincode in the app state
  _changePincode(evt) {
    console.log("inside RegisterForm >>> changepincode >>> pincode "+evt.target.value)
    var newState = this._mergeWithCurrentState({
      pincode: evt.target.value
    });

    this._emitChange(newState);
  }

  // Merges the current state with a change
  _mergeWithCurrentState(change) {
    console.log("inside RegisterForm >>> mergewithcurrentstate >>> change >>> "+JSON.stringify(change))
    console.log("inside RegisterForm >>> mergewithcurrentstate >>> this.props.data >>> "+JSON.stringify(this.props.data))
    return assign(this.props.data, change);
  }

  // Emits a change of the form state to the application state
  _emitChange(newState) {
    console.log("inside RegisterForm >>>inside emitchange >>> new state "+JSON.stringify(newState))
    this.props.dispatch(changeRegisterForm(newState));
  }

  // onSubmit call the passed onSubmit function
  _onSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.props.data.username, this.props.data.password, this.props.firstname,this.props.mobilenumber, this.props.lastname,this.props.gender, this.props.dob, this.props.city,this.props.state, this.props.pincode);
  }
}

RegisterForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  btnText: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired
}



export default RegisterForm;
