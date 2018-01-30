import request from './Request';
import { error } from 'util';

/**
 * Authentication lib
 * @type {Object}
 */
var profileData = {
 
  /**
   * Registers a user in the system
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was registered on the remote server
   */
  addProfileData(firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email) {
    // Post a  request
    request.post('/addprofiledata', { firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email }).then((response) => {
     
      // If the user was successfully registered, log them in
      if (response.profileadded === true) {
        this.login(username, password, callback);
      }}).catch((error) =>
        // If there was a problem registering, show the error
        {callback(false, response.error);}
      )},
  onChange() {}
}

module.exports = auth;
