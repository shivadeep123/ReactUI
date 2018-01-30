import request from './Request';
import { error } from "util";


export function login(username, password, callback) {
  var response= {};
  // If there is a token in the localStorage, the user already is
  // authenticated
  if (this.loggedIn()) {
    callback(true);
    return;
  }
  console.log("inside auth --> Login "+username);
  // Post a  request (see below)
  console.log("---------------------");
  request.post('/api/login', { username, password }).then((response) => {
    console.log("inside auth >>> login >>> response "+JSON.stringify(response))
   // console.log("inside auth ==> login ==>response.authenticated "+response.Authenticated);
    //console.log("inside request -->post response"+response.Authenticated); 
    // If the user was authenticated successfully, save a random token to the
    // localStorage
   
    if (response.data) {
     // localStorage.token = response.token;
      callback(true);
    }}).catch((error) => {
     console.log("inside auth ==> login ==> catch ==>response "+error.response.data.type);
      // If there was a problem authenticating the user, show an error on the
      // form

      callback(false, error.response.data);
    });
}
/**
 * Logs the current user out
 */
export function logout(callback) {
  request.post('/api/logout', {}, () => {
    console.log("google logout");
    console.log("facebook logout");
  });

  callback(true);
}
/**
 * Checks if anybody is logged in
 * @return {boolean} True if there is a logged in user, false if there isn't
 */
export function loggedIn(){
  return !!localStorage.token;
}
/**
 * Registers a user in the system
 * @param  {string}   username The username of the user
 * @param  {string}   password The password of the user
 * @param  {Function} callback Called after a user was registered on the remote server
 */
export function register(username, password, firstname, lastname, email, mobilenumber, gender, dob, city, state, pincode, callback) {
  // Post a  request
  request.post('/api/register', { username, password, firstname, lastname, email, mobilenumber, gender, dob, city, state, pincode }).then((response) => {
   
    // If the user was successfully registered, log them in
    if (response.email  !== null) {
      callback(true);
    }}).catch((error) =>
      // If there was a problem registering, show the error
      {callback(false, response.error);}
)}

export function addProfileRecord(firstname, lastname,project, releasedate, primaryskills,secondaryskills, yearsofexp, trainings, qualification,mobilenumber,email, callback) {
  console.log("inside auth >>> addProfileRecord")
  // Post a  request 
  request.post('/api/addProfileRecord', { firstname, lastname,project, releasedate, primaryskills,secondaryskills, yearsofexp, trainings, qualification,mobilenumber,email }).then((response) => {
    console.log("inside auth >>> addProfileRecord >>> postrequest")
    // If the user was successfully registered, log them in
    if (response) {
    callback(true);
    }}).catch((error) =>
      // If there was a problem registering, show the error
      {callback(false, response.error);}
)}

export function updateProfileRecord(firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email,callback) {
  // Post a  request
  request.post('/api/updateProfileRecord', {firstname, lastname,project, releasedate, primaryskills,secondaryskills, yearsofexp, trainings, qualification,email },).then((response) => {
    
    // If the record is successfully updated
    if (response.updated === true) {
     callback(true);
    }}).catch((error) =>
      // If there was a problem registering, show the error
      {callback(false, response.error);}
)}

export function findAllRecords(callback) {
  console.log("inside auth >>> findAllRecords"); 
  // Post a  request
  request.post('/api/findAllRecords').then((response) => {  
    //if the records are successfully fetched               
    if (response.status != 400) {  
      console.log("inside auth >>> findAllRecords >>> response"+response);         
      callback(true,response.data);
    }
    else{
      console.log("inside auth >>> findAllRecords >>> response"+response);         
      callback(false,response.error);
    }
    }).catch((error) =>
      // If there was a problem fetching records, show the error
      {callback(false, error);}
)}

export function findAllBaseSkills(callback) {
  console.log("inside auth >>> baseskill"); 
  // Post a  request
  request.post('/api/baseskill').then((response) => {  
    //if the records are successfully fetched               
    if (response.status != 400) {  
      console.log("inside auth >>> baseskill >>> response"+response);         
      callback(true,response.data);
    }
    else{
      console.log("inside auth >>> baseskill >>> response"+response);         
      callback(false,response.error);
    }
    }).catch((error) =>
      // If there was a problem fetching records, show the error
      {callback(false, error);}
)}


export function findAllResourceSkills(callback) {
  console.log("inside auth >>> resourceskill"); 
  // Post a  request
  request.post('/api/resourceskill').then((response) => {  
    //if the records are successfully fetched               
    if (response.status != 400) {  
      console.log("inside auth >>> resourceskill >>> response"+response);         
      callback(true,response.data);
    }
    else{
      console.log("inside auth >>> resourceskill >>> response"+response);         
      callback(false,response.error);
    }
    }).catch((error) =>
      // If there was a problem fetching records, show the error
      {callback(false, error);}
)}

export function deleteProfileRecord(email) {
// Post a  request
  request.post('/api/deleteProfileRecord', {email}).then((response) => {
  // If the record is successfully deleted, log them in          
  if (response.deleted === true) {
  callback(true)
  }}).catch((error) =>
  // If there was a problem deleteProfileRecord, show the error
  {callback(false, response.error);}
)}
export function onChange(){}

