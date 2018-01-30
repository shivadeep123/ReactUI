/*
 * RegisterPage
 *
 * Users login on this page
 * Route: /register
 *
 */

import React, { Component} from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../RegisterForm';
import { sendingRequest, register } from '../../actions/AppActions';
import LoadingIndicator from '../LoadingIndicator.react';

export default class RegisterPage extends Component {
	render() {
		const dispatch = this.props.dispatch;
		console.log("inside RegisterPage >>> render >>> props data >>> "+JSON.stringify(this.props.data))
		const { registerFormState, currentlySending } = this.props.data;
		console.log("inside RegisterPage >>> render >>> registerFormState >>> "+JSON.stringify(registerFormState))
    return (
			<div className="registerform-page__wrapper">
			<div className="registerform-page__form-wrapper">
				<div className="registerform-page__form-header">
					<h2 className="registerform-page__form-heading">Register</h2>
					{/* While the form is sending, show the loading indicator,
						otherwise show "Register" on the submit button */}
		    	<RegisterForm data={registerFormState} dispatch={dispatch} location={location} history={this.props.history} onSubmit={::this._register} btnText={"Register"} currentlySending={currentlySending}/>
				</div>
			</div>
			</div>
		);
  }

	// Register a user

	_register(username, password, firstname, lastname, email, mobilenumber, gender, dob, city, state, pincode) {
		const {registerFormState} = this.props.data
		console.log("inside RegisterPage >>> _register >>> this.props.data "+JSON.stringify(this.props.data))
		console.log("inside RegisterPage >>> _register >>>registerFormState "+JSON.stringify(registerFormState))
		console.log("inside RegisterPage >>> _register >>>registerformstatemobile "+JSON.stringify(registerFormState.mobilenumber))
		console.log("inside RegisterPage >>> _register >>> fields "+username+","+password+","+firstname+","+lastname+","+email+","+gender+","+dob+","+city+","+state+","+pincode)
		this.props.dispatch(register(registerFormState.username, registerFormState.password, registerFormState.firstname, registerFormState.lastname, registerFormState.email, registerFormState.mobilenumber, registerFormState.gender, registerFormState.dob, registerFormState.city, registerFormState.state, registerFormState.pincode));
	}
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(RegisterPage);
