import axios from "../../node_modules/axios";
import { updateProfileRecord } from "../actions/AppActions";
import qs from "qs";

/**
 *  XMLHttpRequest wrapper with a syntax similar to the much used request.js
 * @type {Object}
 */
const registerUrl = 'http://localhost:9003/userdetails/registration';
const loginUrl = 'http://localhost:9004/userdetails/login';
const logoutGoogleUrl = 'https://accounts.google.com/Logout?hl=en';
const findallUrl = 'http://localhost:9003/userdetails/findall';
const addProfileRecordUrl='http://localhost:9005/profiledetails/addprofile';
const deleteProfileRecordUrl='http://localhost:9005/profiledetails/deleteprofile';
const updateProfileRecordUrl='http://localhost:9005/profiledetails/updateprofile';
const findAllProfileRecordUrl ='http://localhost:9005/profiledetails/findallprofiles';
const baseSkillUrl ='http://localhost:8085/applicationdetails/baseskills';
const resourceSkillUrl ='http://localhost:8086/resourceskilldetails/skilltracker';
var request = {
  /**
   * Pretends to post to a remote server with  network latency
   * @param  {string}    endpoint The endpoint of the server that should be contacted
   * @param  {?object}   data     The data that should be transferred to the server
   * @param  {?function} callback Called after the server successfully did it's thing
   */
  post(endpoint, data) {

     // console.log("inside axios post data "+data.firstname, data.lastname,data.project,data.releasedate, data.primaryskills,data.secondaryskills,data.yearsofexp,data.trainings, data.qualification, data.mobilenumber,data.email);
      console.log("inside axios post endpoint "+endpoint);
      switch (endpoint) {
        case '/api/login':
        console.log(axios.post(loginUrl,{email:data.username, password:data.password}));
          return axios.post(loginUrl,{email:data.username, password:data.password});
         //return axios.get(findallUrl);
          break;
        case '/api/register':
       return axios.post(registerUrl,{userName:data.username, password:data.password, firstName: data.firstname, lastName: data.lastname, email: data.email, phoneNo:data.mobilenumber,street: data.city+"-street", gender:data.gender, dateOfBirth: data.dob, city: data.city, state: data.state, pinCode: data.pincode});
          break;
        case '/api/logout':
        return  axios.get(logoutGoogleUrl,{headers: {
          'Access-Control-Allow-Origin': '*',
        },
        proxy: {
          host: '127.0.0.1',
          port: 3000
        }});
         case '/api/updateProfileRecord':
      //   return axios.put(updateProfileRecordUrl, {data: {firstName:data.firstname, lastName:data.lastname,project:data.project, 
      //    releaseDate:data.releasedate, primaryskills:data.primarySkills,secondarySkills:data.secondaryskills, 
      //     yearsOfExperience:data.yearsofexp, trainings:data.trainings, qualification:data.qualification, 
      //     mobileNo:data.mobilenumber,email:data.email}},{params: { email: data.email }
      //  },
      //   {responseType: 'json'})
      return axios({ method: 'PUT', url: updateProfileRecordUrl, data: {firstName:data.firstname, lastName:data.lastname,project:data.project, 
        releaseDate:data.releasedate, primaryskills:data.primarySkills,secondarySkills:data.secondaryskills, 
        yearsOfExperience:data.yearsofexp, trainings:data.trainings, qualification:data.qualification, 
        mobileNo:data.mobilenumber,email:data.email},params: { email: data.email } })        
        break;
        case '/api/addProfileRecord':
        return axios.post(addProfileRecordUrl,{firstName:data.firstname, lastName:data.lastname,project:data.project, releaseDate:data.releasedate, primarySkills:data.primaryskills,secondarySkills:data.secondaryskills, yearsOfExperience:data.yearsofexp, trainings:data.trainings, qualification:data.qualification, mobileNo:data.mobilenumber,email:data.email}) 
        break;
        case '/api/deleteProfileRecord':
        return axios.delete(deleteProfileRecordUrl,{params: { email: data.email }})
        case '/api/findAllRecords':
        return axios.get(findAllProfileRecordUrl)
        break;
        case '/api/baseskill':
        return axios.get(baseSkillUrl)
        break;
        case '/api/resourceskill':
        return axios.get(resourceSkillUrl)
        default:
        break;
      }
  }
}

module.exports = request;
