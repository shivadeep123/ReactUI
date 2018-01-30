
/*
 * HomePage
 *
 * This is the first thing users see of the app
 * Route: /
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from '../Nav.react';
import { connect } from 'react-redux';
import { browserHistory } from "react-router";

class HomePage extends Component {
	render() {
    const dispatch = this.props.dispatch;
    const { loggedIn } = this.props.data;

    return (
			<article>
				<div>
					<section className="text-section">
						{/* Change the copy based on the authentication status */}
						{loggedIn ? (
							<h1>Welcome to Login page, you are logged in!</h1>
						) : (
							 // <h1>Welcome</h1>
							 <div>
							 <input type="button" className="btn-btn-login" onClick={onclick} value="EmployeeData"/>
							 </div>
						// )}
						// {loggedIn ? (
						// 	<Link to="/dashboard" className="btn btn--dash">Dashboard</Link>
						// ) : (
						// 	<div>
						// 		<Link to="/login" className="btn btn--login">Login</Link>
						// 		<Link to="/register" className="btn btn--register">Register</Link>
						// 	</div>
						)}
					</section>
				</div>
			</article>
		);
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

function onclick()
{
	browserHistory.push("/employeepage");
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
