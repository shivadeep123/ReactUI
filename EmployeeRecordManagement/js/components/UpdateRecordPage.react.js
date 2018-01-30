/*
 * RegisterPage
 *
 * Users login on this page
 * Route: /register
 *
 */

import React, { Component} from 'react';
import { connect } from 'react-redux';
import UpdateRecordForm from './UpdateRecordForm.react';
import { sendingRequest, updateProfileRecord } from '../actions/AppActions';
import LoadingIndicator from '../components/LoadingIndicator.react';
import { toggleModalFalse } from "../actions/AppActions";

export default class UpdateRecordPage extends Component {
	render() {
		const dispatch = this.props.dispatch;
		const { updateProfileFormState, currentlySending } = this.props.data;
    return (
			<div className="registerform-page__wrapper">
			<div className="registerform-page__form-wrapper">
				<div className="registerform-page__form-header">
					<h2 className="registerform-page__form-heading">Update Record</h2>
					{/* While the form is sending, show the loading indicator,
						otherwise show "Register" on the submit button */}
		    	<UpdateRecordForm data={updateProfileFormState} dispatch={dispatch} location={location} history={this.props.history} onSubmit={::this._updateRecord} btnText={"Update Record"} currentlySending={currentlySending}/>
				</div>
			</div>
			</div>
		);
  }

	// Update a Record
	_updateRecord(firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email) {
		this.props.dispatch(updateProfileRecord(firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email));
	}
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(UpdateRecordPage);
