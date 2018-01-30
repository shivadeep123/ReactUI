/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import bcrypt from 'bcryptjs';
import { FILE_UPLOAD, SET_AUTH, CHANGE_REGISTER_FORM,CHANGE_LOGIN_FORM,SENDING_REQUEST, SET_ERROR_MESSAGE, TOGGLE_MODAL_TRUE, TOGGLE_MODAL_FALSE, CLEAR_ERROR_MESSAGE, CHANGE_ADD_PROFILE_FORM,CHANGE_UPDATE_PROFILE_FORM, SET_PROFILE_DATA, IS_RECORD_SELECTED, SET_BASE_SKILL_DATA, SET_RESOURCE_SKILL_DATA } from '../constants/AppConstants';
import * as errorMessages  from '../constants/MessageConstants';
import * as auth from '../utils/auth';
import genSalt from '../utils/salt';
import { browserHistory } from 'react-router';

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */

export function login(username, password) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ username, password })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }
    // Generate salt for password encryption
    const salt = genSalt(username);
    // Encrypt password
    bcrypt.hash(password, salt, (err, hash) => {
      // Something wrong while hashing
      if (err) {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
        return;
      }
      // Use auth.js to fake a request
      auth.login(username, password, (success, err) => {

        console.log("inside AppActions => auth.login "+success);
        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setAuthState(success));
        if (success === true) {
          // If the login worked, forward the user to the dashboard and clear the form
          forwardTo('/profilepage');
          dispatch(changeLoginForm({
            username: "",
            password: ""
          }));
          this.props.dispatch(toggleModalFalse());
        } else {
          console.log("inside AppActions => auth.login => else => "+err);
          switch (err.type) {
            case 'user-doesnt-exist':
              dispatch(setErrorMessage(errorMessages.USER_NOT_FOUND));
              return;
            case 'password-wrong':
              dispatch(setErrorMessage(errorMessages.WRONG_PASSWORD));
              return;
            default:
              dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
              return;
          }
        }
      });
    });
  }
}

// is record selected

export function isRecordSelected(){
  return { type: IS_RECORD_SELECTED};
}

/**
 * Logs the current user out
 */
export function logout() {
  return (dispatch) => {
  //  dispatch(sendingRequest(true));
    auth.logout((success, err) => {
      if (success === true) {
        dispatch(sendingRequest(false))
        dispatch(setAuthState(false));
        console.log("inside Appactions >>> logout");
        forwardTo('/')
        browserHistory.replace('/')
        browserHistory.push(null, '/');
        browserHistory.push(null, '/profilepage');
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      }
    });
  }
}

export function allData() {
  console.log("inside AppActions >>> allData");
  return (dispatch) => {
    dispatch(sendingRequest(true));
    auth.findAllRecords((success, response) => {
      console.log(response);
      console.log("inside AppActions >>> findAllRecords")
      if (success === true) {
        console.log("inside AppActions >>> findSuccess >>> "+response);
        dispatch(setProfileData(response));
        dispatch(sendingRequest(false)) 
      } else {
        console.log(response.err)
        dispatch(sendingRequest(false))
        //dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      }
    });
  }
}

export function baseSkillDataAction() {
  console.log("inside AppActions >>> baseSkillData");
  return (dispatch) => {
    auth.findAllBaseSkills((success, response) => {
      console.log(response);
      console.log("inside AppActions >>> findAllRecords")
      if (success === true) {
        console.log("inside AppActions >>> findbaseskilldataSuccess >>> "+response);
        dispatch(setBaseSkillData(response));
      } else {
        console.log(response.err)
        //dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      }
    });
  }
}

export function resourceSkillDataAction() {
  console.log("inside AppActions >>> resourceSkillData");
  return (dispatch) => {
    auth.findAllResourceSkills((success, response) => {
      console.log(response);
      console.log("inside AppActions >>> resourceskilldata")
      if (success === true) {
        console.log("inside AppActions >>> findresourceskilldataSuccess >>> "+response);
        dispatch(setResourceSkillData(response));
      } else {
        console.log(response.err)
        //dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      }
    });
  }
}


/**
 * Registers a user
 * @param  {string} username The username of the new user
 * @param  {string} password The password of the new user
 * @param  {string} mobilenumber The password of the new user
 * @param  {string} firstname The firstname of the new user
 * @param  {string} lastname The lastname of the new user
 * @param  {string} email The email of the new user
 * @param  {string} gender The gender of the new user
 * @param  {string} dob The dob of the new user
 * @param  {string} city The city of the new user
 * @param  {string} state The state of the new user
 * @param  {string} pincode The pincode of the new user
 */
export function register(username, password, firstname, lastname, email, mobilenumber, gender, dob, city, state, pincode) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
      dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    // username: "",
    // password: "",
    // firstname: "",
    // lastname: "",
    // email:"",
    // mobilenumber:"",
    // gender:"",
    // dob:"",
    // city:"",
    // state:"",
    // pincode:""
    if (anyElementsRegEmpty({ username, password, firstname, lastname, email, mobilenumber, gender, dob, city, state, pincode })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }
    // Generate salt for password encryption
    const salt = genSalt(username);
    // Encrypt password
    bcrypt.hash(password, salt, (err, hash) => {
      // Something wrong while hashing
      if (err) {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
        return;
      }

      console.log("inside appActions >>> register >>> fields "+username+","+password+","+firstname+","+lastname+","+email+","+gender+","+dob+","+city+","+state+","+pincode)
      // Use auth.js to make a reuest
      auth.register(username, password, firstname, lastname, email, mobilenumber, gender, dob, city, state, pincode, (success, err) => {
        
        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setAuthState(success));
        if (success) {
          // If the register worked, forward the user to the homepage and clear the form
          forwardTo('/dashboard');
          dispatch(changeRegisterForm({
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email:"",
            mobilenumber:"",
            gender:"",
            dob:"",
            city:"",
            state:"",
            pincode:""
          }));
        } else {
          switch (err.type) {
            case 'username-exists':
              dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
              return;
            default:
              dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
              return;
          }
        }
      });
    });
  }
}

/**
 * Profile data of user
 * @param  {string} firstname The firstname of the new user
 * @param  {string} lastname The lastname of the new user
 * @param  {string} project The project of the new user
 * @param  {string} release date The release date of the new user
 * @param  {string} primary skills The primary skills of the new user
 * @param  {string} secondary skills The secondary skills of the new user
 * @param  {string} years of experience The years of experience of the new user
 * @param  {string} trainings The trainings of the new user
 * @param  {string} Qualification The Qualification of the new user
 * @param  {string} Mobile number The Mobile number of the new user
 * @param  {string} email number The email number of the new user
 */
export function addProfileRecord(firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email) {
  console.log("inside AppActions >>> addProfileRecord");
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsAddEmpty({ firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email })) {
      console.log(firstname+","+lastname+","+project+","+releaseDate+","+primarySkills+","+secondarySkills+","+yearsOfExperience+","+trainings+","+qualification+","+mobileNumber+","+email)
      console.log(anyElementsEmpty({ firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email }));
      console.log("inside AppActions >>> addProfileRecord >>> ifElementsEmpty");
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }
      // Use auth.js to make a request
      auth.addProfileRecord(firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email, (success, err) => {
        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setAuthState(success));
        if (success) {
          console.log("inside auth >>> ifsuccess")
          // If the register worked, forward the user to the homepage and clear the form
          dispatch({ type: TOGGLE_MODAL_FALSE});
          browserHistory.pushState(null, '/');
          browserHistory.pushState(null, '/profilepage');
          dispatch(changeAddProfileForm({
            firstname:'',
            lastname:'',
            project:'',
            releasedate:'',
            primaryskills:'',
            secondaryskills:'',
            yearsofexp:'',
            trainings:'',
            qualification:'',
            mobilenumber:'',
            email:''
          }));
          
        } else {
          switch (err.type) {
            case 'username-exists':
              dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
              return;
            default:
              dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
              return;
          }
        }
    });
  }
}

export function setColorCode(colorCode){
  return { type: SET_COLOR_CODE, colorCode };
}

export function deleteProfileRecord(email) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
   
      // Use auth.js to make a request
      auth.deleteProfileRecord(email, (success, err) => {
        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setAuthState(success));
        if (success) {
          // If the delete worked, forward the user to the profilepage
          history.pushState(null, '/');
          history.pushState(null, '/profilepage');
        } else {
          switch (err.type) {
            case 'username-exists':
              dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
              return;
            default:
              dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
              return;
          }
        }
    });
  }
}

export function updateProfileRecord(firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsUpdtEmpty({ firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }
      // Use auth.js to make a request
      auth.updateProfileRecord(firstname, lastname, project, releaseDate, primarySkills, secondarySkills, yearsOfExperience, trainings, qualification, mobileNumber, email, (success, err) => {
        // When the request is finished, hide the loading indicator
        dispatch(sendingRequest(false));
        dispatch(setAuthState(success));
        if (success) {
          // If the updateProfile worked, forward the user to the homepage and clear the form
          history.pushState(null, '/');
          history.pushState(null, '/profilepage');
          dispatch(changeUpdateProfileForm({
            firstName:'',
            lastName:'',
            project:'',
            releaseDate:'',
            primarySkills:'',
            secondarySkills:'',
            yearsOfExperience:'',
            trainings:'',
            qualification:'',
            mobileNo:'',
            email:''
          }));
        } else {
          switch (err.type) {
            case 'username-exists':
              dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
              return;
            default:
              dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
              return;
          }
        }
    });
  }
}


/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeRegisterForm(newState) {
  return { type: CHANGE_REGISTER_FORM, newState };
}
export function changeLoginForm(newState) {
  return { type: CHANGE_LOGIN_FORM, newState };
}
export function changeAddProfileForm(newState) {
  return { type: CHANGE_ADD_PROFILE_FORM, newState };
}
export function changeUpdateProfileForm(newState) {
  return { type: CHANGE_UPDATE_PROFILE_FORM, newState };
}

export function setProfileData(newState){
  return { type: SET_PROFILE_DATA, newState}
}

export function setBaseSkillData(newState){
  console.log("***************************** inside setbaseskilldata ")
  return { type: SET_BASE_SKILL_DATA, newState}
}

export function setResourceSkillData(newState){
  return { type: SET_RESOURCE_SKILL_DATA, newState}
} 

export function fileUpload(newState){
  dispatch({ type: FILE_UPLOAD, newState});
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

export function toggleModalFalse(){
  console.log("inside >>> AppActions >>> toggleModalFalse");
  
  
  return (dispatch) => {dispatch({ type: TOGGLE_MODAL_FALSE}),
    dispatch(changeAddProfileForm({
      firstname:'',
      lastname:'',
      project:'',
      releasedate:'',
      primaryskills:'',
      secondaryskills:'',
      yearsofexp:'',
      trainings:'',
      qualification:'',
      mobilenumber:'',
      email:''
    }),changeUpdateProfileForm({
      firstName:'',
      lastName:'',
      project:'',
      releaseDate:'',
      primarySkills:'',
      secondarySkills:'',
      yearsOfExperience:'',
      trainings:'',
      qualification:'',
      mobileNo:'',
      email:''
    })
  ),
  dispatch(clearErrorMessage())
}
}

export function setResouceSkillColorCodes(){
  const {resourceSkillData, baseSkillData} = this.props.data;
  if(resourceSkillData != null){
  //********************************************start of setting color codes *******************************************************/
  for(var j=0;j<resourceSkillData.totalRecords;j++)  
  {     this.props.dispatch(resourceSkillDataAction()) 
  console.log(" ********************************* outerloop")
  console.log("==================================  resourceSkillData >>> "+JSON.stringify(resourceSkillData))
  console.log("++++++++++++++++++++++++++++++++++  resourceSkillData >>> "+JSON.stringify(resourceSkillData.totalRecords))
  for(var i=0;i<baseSkillData.totalRecords;i++){
  console.log(" ********************************* innerloop")
  console.log("******************************** "+resourceSkillData.objects)
  // console.log("******************************** "+baseSkillData.objects)
  //&& (row.moduleName === baseSkillData.objects[i].moduleName) && (row.programName === baseSkillData.objects[i].programName
  if(resourceSkillData.objects[j].applicationName === baseSkillData.objects[i].applicationName){           
//PowerBuilder color code
      console.log("******************************** "+resourceSkillData.applicationName)
      console.log("******************************** "+baseSkillData.applicationName)
      if(resourceSkillData.objects[j].powerBuilder <  baseSkillData.objects[i].powerBuilder)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {powerBuilderColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].powerBuilder >  baseSkillData.objects[i].powerBuilder)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {powerBuilderColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].powerBuilder ===  baseSkillData.objects[i].powerBuilder)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {powerBuilderColor:'amber'})))                               
      }

//lotusNotesScripting color code
      if(resourceSkillData.objects[j].lotusNotesScripting <  baseSkillData.objects[i].lotusNotesScripting)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {lotusNotesScriptingColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].lotusNotesScripting >  baseSkillData.objects[i].lotusNotesScripting)
      {                         
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {lotusNotesScriptingColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].lotusNotesScripting ===  baseSkillData.objects[i].lotusNotesScripting)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {lotusNotesScriptingColor:'amber'})))                               
      }

//cobal_CICS color code
      if(resourceSkillData.objects[j].cobal_CICS <  baseSkillData.objects[i].cobal_CICS)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {cobal_CICSColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].cobal_CICS >  baseSkillData.objects[i].cobal_CICS)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {cobal_CICSColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].cobal_CICS ===  baseSkillData.objects[i].cobal_CICS)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {cobal_CICSColor:'amber'})))                               
      }

//ims_JCL color code
      if(resourceSkillData.objects[j].ims_JCL <  baseSkillData.objects[i].ims_JCL)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {ims_JCLColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].ims_JCL >  baseSkillData.objects[i].ims_JCL)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {ims_JCLColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].ims_JCL ===  baseSkillData.objects[i].ims_JCL)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {ims_JCLColor:'amber'})))                               
      }

//cpas color code  
      if(resourceSkillData.objects[j].cpas <  baseSkillData.objects[i].cpas)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {cpasColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].cpas >  baseSkillData.objects[i].cpas)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {cpasColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].cpas ===  baseSkillData.objects[i].cpas)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {cpasColor:'amber'})))                               
      }

//filenetReportManager color code
      if(resourceSkillData.objects[j].filenetReportManager <  baseSkillData.objects[i].filenetReportManager)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {filenetReportManagerColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].filenetReportManager >  baseSkillData.objects[i].filenetReportManager)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {filenetReportManagerColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].filenetReportManager ===  baseSkillData.objects[i].filenetReportManager)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {filenetReportManagerColor:'amber'})))                               
      }

//wdp_UI color code    
      if(resourceSkillData.objects[j].wdp_UI <  baseSkillData.objects[i].wdp_UI)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_UIColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].wdp_UI >  baseSkillData.objects[i].wdp_UI)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_UIColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].wdp_UI ===  baseSkillData.objects[i].wdp_UI)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_UIColor:'amber'})))                               
      }

//wdp_MICROSERVICES color code
      if(resourceSkillData.objects[j].wdp_MICROSERVICES <  baseSkillData.objects[i].wdp_MICROSERVICES)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_MICROSERVICESColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].wdp_MICROSERVICES >  baseSkillData.objects[i].wdp_MICROSERVICES)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_MICROSERVICESColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].wdp_MICROSERVICES ===  baseSkillData.objects[i].wdp_MICROSERVICES)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_MICROSERVICESColor:'amber'})))                               
      }

//wdp_BPEL color code
      if(resourceSkillData.objects[j].wdp_BPEL <  baseSkillData.objects[i].wdp_BPEL)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_BPELColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].wdp_BPEL >  baseSkillData.objects[i].wdp_BPEL)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_BPELColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].wdp_BPEL ===  baseSkillData.objects[i].wdp_BPEL)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_BPELColor:'amber'})))                               
      }

//wdp_BPM color code
      if(resourceSkillData.objects[j].wdp_BPM <  baseSkillData.objects[i].wdp_BPM)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_BPMColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].wdp_BPM >  baseSkillData.objects[i].wdp_BPM)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_BPMColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].wdp_BPM ===  baseSkillData.objects[i].wdp_BPM)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {wdp_BPMColor:'amber'})))                               
      }

//base24Tandem color code
      if(resourceSkillData.objects[j].base24Tandem <  baseSkillData.objects[i].base24Tandem)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {base24TandemColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].base24Tandem >  baseSkillData.objects[i].base24Tandem)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {base24TandemColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].base24Tandem ===  baseSkillData.objects[i].base24Tandem)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {base24TandemColor:'amber'})))                               
      }

//filenetImageServer color code
      if(resourceSkillData.objects[j].filenetImageServer <  baseSkillData.objects[i].filenetImageServer)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {filenetImageServerColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].filenetImageServer >  baseSkillData.objects[i].filenetImageServer)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {filenetImageServerColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].filenetImageServer ===  baseSkillData.objects[i].filenetImageServer)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {filenetImageServerColor:'amber'})))                               
      }

//microsoftSQLServer color code
      if(resourceSkillData.objects[j].microsoftSQLServer <  baseSkillData.objects[i].microsoftSQLServer)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {microsoftSQLServerColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].microsoftSQLServer >  baseSkillData.objects[i].microsoftSQLServer)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {microsoftSQLServerColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].microsoftSQLServer ===  baseSkillData.objects[i].microsoftSQLServer)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {microsoftSQLServerColor:'amber'})))                               
      }

//java color code
      if(resourceSkillData.objects[j].java <  baseSkillData.objects[i].java)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {javaColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].java >  baseSkillData.objects[i].java)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {javaColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].java ===  baseSkillData.objects[i].java)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {javaColor:'amber'})))                               
      }

//coding color code
      if(resourceSkillData.objects[j].coding <  baseSkillData.objects[i].coding)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {codingColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].coding >  baseSkillData.objects[i].coding)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {codingColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].coding ===  baseSkillData.objects[i].coding)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {codingColor:'amber'})))                               
      }

//analytcal color code
      if(resourceSkillData.objects[j].analytcal <  baseSkillData.objects[i].analytcal)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {analytcalColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].analytcal >  baseSkillData.objects[i].analytcal)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {analytcalColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].analytcal ===  baseSkillData.objects[i].analytcal)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {analytcalColor:'amber'})))                               
      }

//bootstrap color code
      if(resourceSkillData.objects[j].bootstrap <  baseSkillData.objects[i].bootstrap)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {bootstrapColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].bootstrap >  baseSkillData.objects[i].bootstrap)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {bootstrapColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].bootstrap ===  baseSkillData.objects[i].bootstrap)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {bootstrapColor:'amber'})))                               
      }

//csharpDOTNET color code
      if(resourceSkillData.objects[j].csharpDOTNET <  baseSkillData.objects[i].csharpDOTNET)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {csharpDOTNETColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].csharpDOTNET >  baseSkillData.objects[i].csharpDOTNET)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {csharpDOTNETColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].csharpDOTNET ===  baseSkillData.objects[i].csharpDOTNET)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {csharpDOTNETColor:'amber'})))                               
      }

//plsql color code
      if(resourceSkillData.objects[j].plsql <  baseSkillData.objects[i].plsql)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {plsqlColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].plsql >  baseSkillData.objects[i].plsql)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {plsqlColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].plsql ===  baseSkillData.objects[i].plsql)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {plsqlColor:'amber'})))                               
      }

//unix color code
      if(resourceSkillData.objects[j].unix <  baseSkillData.objects[i].unix)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {unixColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].unix >  baseSkillData.objects[i].unix)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {unixColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].unix ===  baseSkillData.objects[i].unix)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {unixColor:'amber'})))                               
      }

//vbDOTNET color code                
      if(resourceSkillData.objects[j].vbDOTNET <  baseSkillData.objects[i].vbDOTNET)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {vbDOTNETColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].vbDOTNET >  baseSkillData.objects[i].vbDOTNET)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {vbDOTNETColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].vbDOTNET ===  baseSkillData.objects[i].vbDOTNET)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {vbDOTNETColor:'amber'})))                               
      }

//webservice color code
      if(resourceSkillData.objects[j].webservice <  baseSkillData.objects[i].webservice)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {webserviceColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].webservice >  baseSkillData.objects[i].webservice)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {webserviceColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].webservice ===  baseSkillData.objects[i].webservice)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {webserviceColor:'amber'})))                               
      }

//javascript color code
      if(resourceSkillData.objects[j].javascript <  baseSkillData.objects[i].javascript)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {javascriptColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].javascript >  baseSkillData.objects[i].javascript)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {javascriptColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].javascript ===  baseSkillData.objects[i].javascript)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {javascriptColor:'amber'})))                               
      }

//hibernate color code
      if(resourceSkillData.objects[j].hibernate <  baseSkillData.objects[i].hibernate)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {hibernateColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].hibernate >  baseSkillData.objects[i].hibernate)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {hibernateColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].hibernate ===  baseSkillData.objects[i].hibernate)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {hibernateColor:'amber'})))                               
      }

//spring color code
      if(resourceSkillData.objects[j].spring <  baseSkillData.objects[i].spring)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {springColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].spring >  baseSkillData.objects[i].spring)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {springColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].spring ===  baseSkillData.objects[i].spring)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {springColor:'amber'})))                               
      }

//ejb color code
      if(resourceSkillData.objects[j].ejb <  baseSkillData.objects[i].ejb)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {ejbColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].ejb >  baseSkillData.objects[i].ejb)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {ejbColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].ejb ===  baseSkillData.objects[i].ejb)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {ejbColor:'amber'})))                               
      }

//fileNet color code
      if(resourceSkillData.objects[j].fileNet <  baseSkillData.objects[i].fileNet)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {fileNetColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].fileNet >  baseSkillData.objects[i].fileNet)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {fileNetColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].fileNet ===  baseSkillData.objects[i].fileNet)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {fileNetColor:'amber'})))                               
      }

//j2ee color code
      if(resourceSkillData.objects[j].j2ee <  baseSkillData.objects[i].j2ee)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {j2eeColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].j2ee >  baseSkillData.objects[i].j2ee)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {j2eeColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].j2ee ===  baseSkillData.objects[i].j2ee)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {j2eeColor:'amber'})))                               
      }

//angularJS color code
      if(resourceSkillData.objects[j].angularJS <  baseSkillData.objects[i].angularJS)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {angularJSColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].angularJS >  baseSkillData.objects[i].angularJS)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {angularJSColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].angularJS ===  baseSkillData.objects[i].angularJS)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {angularJSColor:'amber'})))                               
      }

//websphereApplicationSever color code
      if(resourceSkillData.objects[j].websphereApplicationSever <  baseSkillData.objects[i].websphereApplicationSever)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {websphereApplicationSeverColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].websphereApplicationSever >  baseSkillData.objects[i].websphereApplicationSever)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {websphereApplicationSeverColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].websphereApplicationSever ===  baseSkillData.objects[i].websphereApplicationSever)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {websphereApplicationSeverColor:'amber'})))                               
      }

//websphereMQ color code
      if(resourceSkillData.objects[j].websphereMQ <  baseSkillData.objects[i].websphereMQ)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {websphereMQColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].websphereMQ >  baseSkillData.objects[i].websphereMQ)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {websphereMQColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].websphereMQ ===  baseSkillData.objects[i].websphereMQ)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {websphereMQColor:'amber'})))                               
      }

//xml color code
      if(resourceSkillData.objects[j].xml <  baseSkillData.objects[i].xml)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {xmlColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].xml >  baseSkillData.objects[i].xml)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {xmlColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].xml ===  baseSkillData.objects[i].xml)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {xmlColor:'amber'})))                               
      }

//splunk color code
      if(resourceSkillData.objects[j].splunk <  baseSkillData.objects[i].splunk)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {splunkColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].splunk >  baseSkillData.objects[i].splunk)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {splunkColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].splunk ===  baseSkillData.objects[i].splunk)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {splunkColor:'amber'})))                               
      }

//tallymanConfiguration color code
      if(resourceSkillData.objects[j].tallymanConfiguration <  baseSkillData.objects[i].tallymanConfiguration)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {tallymanConfigurationColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].tallymanConfiguration >  baseSkillData.objects[i].tallymanConfiguration)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {tallymanConfigurationColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].tallymanConfiguration ===  baseSkillData.objects[i].tallymanConfiguration)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {tallymanConfigurationColor:'amber'})))                               
      }

//devops color code
      if(resourceSkillData.objects[j].devops <  baseSkillData.objects[i].devops)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {devopsColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].devops >  baseSkillData.objects[i].devops)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {devopsColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].devops ===  baseSkillData.objects[i].devops)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {devopsColor:'amber'})))                               
      }

//db2_sql color code
      if(resourceSkillData.objects[j].db2_sql <  baseSkillData.objects[i].db2_sql)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {db2_sqlColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].db2_sql >  baseSkillData.objects[i].db2_sql)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {db2_sqlColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].db2_sql ===  baseSkillData.objects[i].db2_sql)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {db2_sqlColor:'amber'})))                               
      }

//controlM color code
      if(resourceSkillData.objects[j].controlM <  baseSkillData.objects[i].controlM)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {controlMColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].controlM >  baseSkillData.objects[i].controlM)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {controlMColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].controlM ===  baseSkillData.objects[i].controlM)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {controlMColor:'amber'})))                               
      }

//html color code
      if(resourceSkillData.objects[j].html <  baseSkillData.objects[i].html)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {htmlColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].html >  baseSkillData.objects[i].html)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {htmlColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].html ===  baseSkillData.objects[i].html)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {htmlColor:'amber'})))                               
      }

//jenkins color code
      if(resourceSkillData.objects[j].jenkins <  baseSkillData.objects[i].jenkins)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {jenkinsColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].jenkins >  baseSkillData.objects[i].jenkins)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {jenkinsColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].jenkins ===  baseSkillData.objects[i].jenkins)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {jenkinsColor:'amber'})))                               
      }

//financialServiceoverview color code
      if(resourceSkillData.objects[j].financialServiceoverview <  baseSkillData.objects[i].financialServiceoverview)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {financialServiceoverviewColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].financialServiceoverview >  baseSkillData.objects[i].financialServiceoverview)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {financialServiceoverviewColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].financialServiceoverview ===  baseSkillData.objects[i].financialServiceoverview)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {financialServiceoverviewColor:'amber'})))                               
      }

//cards color code
      if(resourceSkillData.objects[j].cards <  baseSkillData.objects[i].cards)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {cardsColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].cards >  baseSkillData.objects[i].cards)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {cardsColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].cards ===  baseSkillData.objects[i].cards)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {cardsColor:'amber'})))                               
      }

//ticketResolution color code
      if(resourceSkillData.objects[j].ticketResolution <  baseSkillData.objects[i].ticketResolution)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {ticketResolutionColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].ticketResolution >  baseSkillData.objects[i].ticketResolution)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {ticketResolutionColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].ticketResolution ===  baseSkillData.objects[i].ticketResolution)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {ticketResolutionColor:'amber'})))                               
      }

//jobMonitoring color code
      if(resourceSkillData.objects[j].jobMonitoring <  baseSkillData.objects[i].jobMonitoring)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {jobMonitoringColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].jobMonitoring >  baseSkillData.objects[i].jobMonitoring)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {jobMonitoringColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].jobMonitoring ===  baseSkillData.objects[i].jobMonitoring)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {jobMonitoringColor:'amber'})))                               
      }

//lowLevelDesign color code
      if(resourceSkillData.objects[j].lowLevelDesign <  baseSkillData.objects[i].lowLevelDesign)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {lowLevelDesignColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].lowLevelDesign >  baseSkillData.objects[i].lowLevelDesign)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {lowLevelDesignColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].lowLevelDesign ===  baseSkillData.objects[i].lowLevelDesign)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {lowLevelDesignColor:'amber'})))                               
      }
      
//minorBAUWork color code
      if(resourceSkillData.objects[j].minorBAUWork <  baseSkillData.objects[i].minorBAUWork)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {minorBAUWorkColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].minorBAUWork >  baseSkillData.objects[i].minorBAUWork)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {minorBAUWorkColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].minorBAUWork ===  baseSkillData.objects[i].minorBAUWork)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {minorBAUWorkColor:'amber'})))                               
      }

//deployment color code
      if(resourceSkillData.objects[j].deployment <  baseSkillData.objects[i].deployment)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {deploymentColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].deployment >  baseSkillData.objects[i].deployment)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {deploymentColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].deployment ===  baseSkillData.objects[i].deployment)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {deploymentColor:'amber'})))                               
      }

//testing color code
      if(resourceSkillData.objects[j].testing <  baseSkillData.objects[i].testing)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {testingColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].testing >  baseSkillData.objects[i].testing)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {testingColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].testing ===  baseSkillData.objects[i].testing)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {testingColor:'amber'})))                               
      }

//architecture color code
      if(resourceSkillData.objects[j].architecture <  baseSkillData.objects[i].architecture)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {architectureColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].architecture >  baseSkillData.objects[i].architecture)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {architectureColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].architecture ===  baseSkillData.objects[i].architecture)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {architectureColor:'amber'})))                               
      }

//featuresFunctionalites color code
      if(resourceSkillData.objects[j].featuresFunctionalites <  baseSkillData.objects[i].featuresFunctionalites)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {featuresFunctionalitesColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].featuresFunctionalites >  baseSkillData.objects[i].featuresFunctionalites)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {featuresFunctionalitesColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].featuresFunctionalites ===  baseSkillData.objects[i].featuresFunctionalites)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {featuresFunctionalitesColor:'amber'})))                               
      }

//codeComplexity color code
      if(resourceSkillData.objects[j].codeComplexity <  baseSkillData.objects[i].codeComplexity)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {codeComplexityColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].codeComplexity >  baseSkillData.objects[i].codeComplexity)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {codeComplexityColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].codeComplexity ===  baseSkillData.objects[i].codeComplexity)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {codeComplexityColor:'amber'})))                               
      }

//interfacing color code
      if(resourceSkillData.objects[j].interfacing <  baseSkillData.objects[i].interfacing)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {interfacingColor:'red'})))                               
      }
      if(resourceSkillData.objects[j].interfacing >  baseSkillData.objects[i].interfacing)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {interfacingColor:'green'})))                               
      }
      if(resourceSkillData.objects[j].interfacing ===  baseSkillData.objects[i].interfacing)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {interfacingColor:'amber'})))                               
      }

//deployment2 color code
      if(resourceSkillData.objects[j].deployment2 <  baseSkillData.objects[i].deployment2)
      {                 
          //setcolor red if resource skill is less than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {deployment2Color:'red'})))                               
      }
      if(resourceSkillData.objects[j].deployment2 >  baseSkillData.objects[i].deployment2)
      {                 
          //setcolor green if resource skill is greater than the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {deployment2Color:'green'})))                               
      }
      if(resourceSkillData.objects[j].deployment2 ===  baseSkillData.objects[i].deployment2)
      {                 
          //setcolor amber if resource skill is equal to the skill demand
          this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {deployment2Color:'amber'})))                               
      } 
      
//requirementAnalysis color code
     if(resourceSkillData.objects[j].requirementAnalysis <  baseSkillData.objects[i].requirementAnalysis)
     {                 
     //setcolor red if resource skill is less than the skill demand
     this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {requirementAnalysisColor:'red'})))                               
     }
     if(resourceSkillData.objects[j].requirementAnalysis >  baseSkillData.objects[i].requirementAnalysis)
     {                 
     //setcolor green if resource skill is greater than the skill demand
     this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {requirementAnalysisColor:'green'})))                               
     }
     if(resourceSkillData.objects[j].requirementAnalysis ===  baseSkillData.objects[i].requirementAnalysis)
     {                 
     //setcolor amber if resource skill is equal to the skill demand
     this.props.dispatch(setresourceSkillData( assign(resourceSkillData.objects[j], {requirementAnalysisColor:'amber'})))                               
     }          
 }    
}

//******************************************** End of setting color code **********************************************************/                             

const {resourceSkillData} = this.props.data
console.log(" >>>>>>>>>>>>>>>>>>>> "+resourceSkillData)
      }
  }
}



export function toggleModalTrue(modalName){
  return (dispatch) => {dispatch({ type: TOGGLE_MODAL_TRUE, value: modalName})}
}

export function clearErrorMessage(){
  return (dispatch) => {dispatch({type: CLEAR_ERROR_MESSAGE})}
}
/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
  return (dispatch) => {
    dispatch({ type: SET_ERROR_MESSAGE, message });

    const form = document.querySelector('.form-page__form-wrapper');
    if (form) {
      form.classList.add('js-form__err-animation');
      // Remove the animation class after the animation is finished, so it
      // can play again on the next error
      setTimeout(() => {
        form.classList.remove('js-form__err-animation');
      }, 150);

      // Remove the error message after 3 seconds
      setTimeout(() => {
        dispatch({ type: SET_ERROR_MESSAGE, message: '' });
      }, 3000);
    }
  }
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
  console.log('forwardTo(' + location + ')');
  browserHistory.push(location);
}


/**
 * Checks if any elements of a JSON object are empty
 * @param  {object} elements The object that should be checked
 * @return {boolean}         True if there are empty elements, false if there aren't
 */
function anyElementsEmpty(elements) {
  for (let element in elements) {
    if (!elements[element]) {
      return true;
    }
  }
  return false;
}
function anyElementsRegEmpty(elements) {
  console.log("inside appactions >>> anyelementsregempty >>> ")
  for (let element in elements) {
    if (!elements[element]) {
      return true;
    }
  }
  return false;
}
function anyElementsUpdtEmpty(elements) {
  for (let element in elements) {
    if (!elements[element]) {
      return true;
    }
  }
  return false;
}
function anyElementsAddEmpty(elements) {
  for (let element in elements) {
    if (!elements[element]) {
      return true;
    }
  }
  return false;
}

