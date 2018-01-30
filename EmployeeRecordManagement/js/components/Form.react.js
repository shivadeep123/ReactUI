/**
 * Form.react.js
 *
 * The form with a username and a password input field, both of which are
 * controlled via the application state.
 *
 */

import React, { Component } from 'react';
import { changeForm } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';
import ErrorMessage from './ErrorMessage.react';
import FacebookLogin from "react-facebook-login";
import {GoogleLogin  } from "react-google-login-component";
import { changeLoginForm } from "../actions/AppActions";
import { FontAwesome } from "react-font-awesome";
import Dashboard from "./pages/Dashboard.react";
import { browserHistory } from 'react-router';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class LoginForm extends Component {
  render() {
    return(
      <div>
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
        <ErrorMessage />
        <div className="form__field-wrapper">
          <input className="form__field-input" type="text" id="username" value={this.props.data.username} placeholder="Enter user name" onChange={this._changeUsername.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
          <label className="form__field-label" htmlFor="username">Username</label>
        </div>
        <div className="form__field-wrapper">
          <input className="form__field-input" id="password" type="password" value={this.props.data.password} placeholder="Enter password"  onChange={this._changePassword.bind(this)} />
          <label className="form__field-label" htmlFor="password">Password</label>
        </div>
        <div className="form__submit-btn-wrapper">
          {this.props.currentlySending ? (
            <LoadingButton />
          ) : (
            <button className="form__submit-btn" type="submit">{this.props.btnText}</button>
          )}
        </div>
      </form>
      <div className="fb-google-login">
        <FacebookLogin
        appId="809202792599914"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.responseFacebook.bind(this)}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
        />
        <GoogleLogin socialId="575277027846-t2h2c7340feiud3q7ccie6tkk5qs23lo.apps.googleusercontent.com"
          className="google-login"
          scope="profile"
          fetchBasicProfile={false}
          responseHandler={this.responseGoogle.bind(this)}
          buttonText="Login with Google"
        />
      </div>
  </div>
    );
  }

  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    if(id_token)
    {
      var newState = this._mergeWithCurrentState({
        loggedIn: true
      });
    browserHistory.push('/profilepage');
    this._emitChange(newState);
    }
    //anything else you want to do(save to localStorage)...
  }
  
  responseFacebook(response) {
    console.log(response);
    if(response.email)
    {

      var newState = this._mergeWithCurrentState({
        loggedIn: true
      });
    browserHistory.push('/profilepage');
    this._emitChange(newState);
    }
  }

  // Change the username in the app state
  _changeUsername(evt) {
    var newState = this._mergeWithCurrentState({
      username: evt.target.value
    });

    this._emitChange(newState);
  }

  // Change the password in the app state
  _changePassword(evt) {
    var newState = this._mergeWithCurrentState({
      password: evt.target.value
    });

    this._emitChange(newState);
  }

  // Merges the current state with a change
  _mergeWithCurrentState(change) {
    return assign(this.props.data, change);
  }

  // Emits a change of the form state to the application state
  _emitChange(newState) {
    this.props.dispatch(changeLoginForm(newState));
  }

  // onSubmit call the passed onSubmit function
  _onSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.props.data.username, this.props.data.password);
  }
}

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  btnText: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired
}

export default LoginForm;
