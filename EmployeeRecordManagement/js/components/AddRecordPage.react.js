/*
 * RegisterPage
 *
 * Users login on this page
 * Route: /register
 *
 */

import React, { Component} from 'react';
import { connect } from 'react-redux';
import AddRecordForm from '../components/AddRecordForm.react';
import { sendingRequest, addProfileRecord } from '../actions/AppActions';
import LoadingIndicator from '../components/LoadingIndicator.react';


export default class AddRecordPage extends Component {
	render() {
		const dispatch = this.props.dispatch;
		const { addProfileFormState, currentlySending } = this.props.data;
    return (
			<div className="registerform-page__wrapper">
			<div className="registerform-page__form-wrapper">
				<div className="registerform-page__form-header">
					<h2 className="registerform-page__form-heading">Add Record</h2>
					{/* While the form is sending, show the loading indicator,
						otherwise show "Register" on the submit button */}
		    	<AddRecordForm data={addProfileFormState} dispatch={dispatch} location={location} history={this.props.history} onSubmit={::this._addRecord} btnText={"Add Record"} currentlySending={currentlySending}/>
				</div>
			</div>
			</div>
		);
  }

	// Register a user
	_addRecord(firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email) {
		this.props.dispatch(addProfileRecord(firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email));
	}
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(AddRecordPage);
