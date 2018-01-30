/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code
 *
 */

// Load the ServiceWorker, the Cache polyfill, the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!../serviceworker.js';
import 'file?name=[name].[ext]!../serviceworker-cache-polyfill.js';
import 'file?name=[name].[ext]!../manifest.json';
import 'file?name=[name].[ext]!../.htaccess';
import 'file?name=[name].[ext]!../favicon.ico';
import 'file?name=[name].[ext]!../favicon.png';

//Check for ServiceWorker support before trying to install it
if ('serviceWorker' in navigator) {
    // Install ServiceWorker
  navigator.serviceWorker.register('/serviceworker.js').then(() => {
  }).catch((err) => {
    // Installation failed
    console.log('ServiceWorker registration failed, error:', err);
  });
} else {
  // No ServiceWorker Support
  console.log('ServiceWorker is not supported in this browser');
}

// Import all the third party stuff
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { homeReducer } from './reducers/reducers';
import FontFaceObserver from 'fontfaceobserver';
import { AddRecordPage } from "./components/AddRecordPage.react";
import { DeleteRecordPage } from "./components/DeleteRecordPage.react";
import { UpdateRecordPage } from "./components/UpdateRecordPage.react";
import SkillGapSheet from "./components/SkillGapSheet.react";
import Metrics from "./components/Metrics.react";
// import FileUpload from "./components/pages/FileUploadPage.react";
// import ExcelToJson from "./components/pages/ExcelToJson.react";



// When Open Sans is loaded, add the js-open-sans-loaded class to the body
// which swaps out the fonts
const openSansObserver = new FontFaceObserver('Open Sans');

openSansObserver.check().then(() => {
  document.body.classList.add('js-open-sans-loaded');
}, (err) => {
  document.body.classList.remove('js-open-sans-loaded');
});

// Import the components used as pages
import HomePage from './components/pages/HomePage.react';
import LoginPage from './components/pages/LoginPage.react';
import RegisterPage from './components/pages/RegisterPage.react';
import Dashboard from './components/pages/Dashboard.react';
import NotFound from './components/pages/NotFound.react';
import App from './components/App.react';
import EmployeeProfile from './components/pages/EmployeeProfile.react';
import EmployeePage from './components/pages/EmployeePage.react';


// Import the CSS file, which webpack transfers to the build folder
import '../css/main.css';

//import jquery and bootstrap

// const $ = require('jquery');
// window.jQuery = $;
// window.tether = require('tether')
// window.Popper = require('popper')
// require('bootstrap');
// import $ from "jquery";
// import tether from "tether";
// import './bootstrap.min.js';


// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);


function checkAuth(nextState, replaceState) {
  let { loggedIn } = store.getState();

  // check if the path isn't dashboard
  // that way we can apply specific logic
  // to display/render the path we want to
  if (nextState.location.pathname !== '/dashboard') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  } else {
    // If the user is already logged in, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  }
}

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={HomePage} />
        <Route onEnter={checkAuth}>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/dashboard" component={Dashboard} /> 
          <Route path="/profilepage/addRecord" component={AddRecordPage} />   
          <Route path="/deleteRecord" component={DeleteRecordPage} /> 
          <Route path="/updateRecord" component={UpdateRecordPage} />                       
        </Route>
        {/* <Route path="/exceltojson" component={ExcelToJson} />   */}
        <Route path="/metrics" component={Metrics} />   
        <Route path="/employeepage" component={EmployeePage} />
        <Route path="/dowloadskillgap" component={SkillGapSheet} />
        {/* <Route path="/fileupload" component={FileUpload} />   */}
        <Route path="/profilepage" component={EmployeeProfile}/>
        <Route path="*" component={NotFound} />     
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
