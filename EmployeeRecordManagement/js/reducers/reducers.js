/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import { FILE_UPLOAD, CHANGE_LOGIN_FORM,CHANGE_REGISTER_FORM, SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE,TOGGLE_MODAL_FALSE,TOGGLE_MODAL_TRUE, CLEAR_ERROR_MESSAGE,CHANGE_ADD_PROFILE_FORM, CHANGE_UPDATE_PROFILE_FORM,SET_PROFILE_DATA, IS_RECORD_SELECTED, SET_BASE_SKILL_DATA, SET_RESOURCE_SKILL_DATA } from '../constants/AppConstants';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');
import {loggedIn} from '../utils/auth';


// The initial application state
const initialState = {
  registerFormState: {
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
  },
  loginFormState: {
    username: '',
    password: '',
    email:''
  },
  addProfileFormState:{
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
  },
  updateProfileFormState:{
    email:'',
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
  },

  profileData: [],
  
  currentlySending: false,
  loggedIn: loggedIn(),
  errorMessage: '',
  isOpenAddRecord: false,
  isOpenUpdateRecord: false,
  isOpenDeleteRecord: false,
  searchField:'',
  isRecordSelected:false,

  fileUpload: {
  sheets:[],
  names:[],
  curSheetIndex :0
  },

 baseSkillData: [],
 resourceSkillData: []
};

// Takes care of changing the application state
export function homeReducer(state = initialState, action) {
  console.log("inside reducer");
  switch (action.type) {
    case CHANGE_LOGIN_FORM:
      return assign({}, state, {
        loginFormState: action.newState
      });
      break;
      case CHANGE_REGISTER_FORM:
      return assign({}, state, {
        registerFormState: action.newState
      });
      break;
    case SET_PROFILE_DATA:
      return assign({},state,{
        profileData: action.newState})
    break;
    case SET_BASE_SKILL_DATA:
        return assign({},state,{
          baseSkillData: action.newState
        })
    case SET_RESOURCE_SKILL_DATA:
        return assign({},state,{
          resourceSkillData: action.newState
        })
    case CHANGE_ADD_PROFILE_FORM:
      return assign({}, state, {
        addProfileFormState: action.newState
      });
      break;
    case CHANGE_UPDATE_PROFILE_FORM:
      return assign({}, state, {
        updateProfileFormState: action.newState
      });
      break;   
    case SET_AUTH:
      return assign({}, state, {
        loggedIn: action.newState
      });
      break;
    case SENDING_REQUEST:
      return assign({}, state, {
        currentlySending: action.sending
      });
      break;
    case CLEAR_ERROR_MESSAGE:
    return assign({}, state, {
      errorMessage: ''
    });
      break;
    case SET_ERROR_MESSAGE:
      return assign({}, state, {
        errorMessage: action.message
      });
    case TOGGLE_MODAL_TRUE:
      if(action.value == "Add")
      return assign({},state,{
        isOpenAddRecord: true,
        isOpenUpdateRecord: false,
        isOpenDeleteRecord: false
      });
      if(action.value == "Update")
      return assign({},state,{
        isOpenAddRecord: false,
        isOpenUpdateRecord: true,
        isOpenDeleteRecord: false
      });
      if(action.value == "Delete")
      return assign({},state,{
        isOpenAddRecord: false,
        isOpenUpdateRecord: false,
        isOpenDeleteRecord: true
      });
      case TOGGLE_MODAL_FALSE:
      return assign({},state,{
        isOpenAddRecord: false,
        isOpenUpdateRecord: false,
        isOpenDeleteRecord: false
      });
      case IS_RECORD_SELECTED:
      return assign({},state,{
        isRecordSelected : true
      })
      case FILE_UPLOAD:
      return assign({}, state, {
       fileUpload : action.newState
      });
    default:
      return state;
  }
}
