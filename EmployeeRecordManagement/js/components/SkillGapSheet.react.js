import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn, ExportCSVButton } from 'react-bootstrap-table';
import ButtonToolbar, {Button} from "react-bootstrap";
import { connect } from 'react-redux';
import { baseSkillDataAction, resourceSkillDataAction } from "../actions/AppActions";
import NavProfile from "../components/NavProfile.react";
export default class SkillGapSheet extends Component{
    constructor(props) {
        super(props);
        this.handleExpand = this.handleExpand.bind(this);
        this.state = {
          // Default expanding row
          expanding: [ 2 ]
        };
      }
  componentDidMount(){
    this.props.dispatch(baseSkillDataAction())
    this.props.dispatch(resourceSkillDataAction())

    const {baseSkillData, resourceSkillData} = this.props.data
  //  console.log("inside SkillGapSheet >>> inside componentDidMount >>> baseSkillData "+baseSkillData)
  //  console.log("inside SKillGapSheet >>> inside componentDidMount >>> resourceSkillData "+resourceSkillData)
  }
//  need these roles and their skill demand.
//   Sr Application Devloper
//   Application Developer
//   Sr Support Analyst
//   Support Analyst
//   Support Analyst
//   Developer
//   Tech Lead
//   Sr Analyst Programmer
//   Sr Developer
//   Business Analyst
//   ITPM
//   Delivery Manager
//   Tester
//   PM
//   Architect
//   Team Lead
//   System Manager

  //skill difference < 0 is deficit
  
    tableData = [];
    deficitSkillData  = []
    trainingData = []
 

  addDeficitSKillData(){
    const {baseSkillData, resourceSkillData} = this.props.data
    this.deficitSkillData = new Array(resourceSkillData.totalRecords)
    this.trainingData = new Array(resourceSkillData.totalRecords)
    for (var k = 0; k < resourceSkillData.totalRecords; k++) {
        this.deficitSkillData[k] = [];
        this.trainingData[k] = [];
      }
   // console.log("inside SkillGapSheet >>> inside addDeficitSkillData >>> baseSkillData "+JSON.stringify(baseSkillData))
   // console.log("inside SkillGapSheet >>> inside addDeficitSkillData >>> resourceSkillData >>> [0]applicationName"+JSON.stringify(resourceSkillData.objects[0].applicationName))
    for(var i=0;i<baseSkillData.totalRecords;i++){
     //**   console.log("inside SkillGapSheet >>> inside addDeficitSkillData >>> inside outer loop") 
    for(var j=0;j<resourceSkillData.totalRecords;j++){  
      //**  console.log("inside SkillGapSheet >>> inside addDeficitSkillData >>> inside inner loop")
        //console.log("inside SkillGapSheet >>> inside addDeficitSkillData >>> inside inner loop >>> deficitSkillData[j] "+this.deficitSkillData[0]) 
        //console.log("inside SkillGapSheet >>> inside addDeficitSkillData >>> inside inner loop >>> deficitSkillData[j].push test"+this.deficitSkillData[j].push(''))       
        //console.log("inside SkillGapSheet >>> inside addDeficitSkillData >>> inside inner loop >>> trainingData[j].push test"+this.trainingData[j].push('')) 
        this.trainingData[j].push("{")
        if((resourceSkillData.objects[j].applicationName === baseSkillData.objects[i].applicationName) && (resourceSkillData.objects[j].moduleName === baseSkillData.objects[i].moduleName) && (resourceSkillData.objects[j].programName === baseSkillData.objects[i].programName))
        {
        //**    console.log("inside SkillGapSheet >>> inside addDeficitSkillData >>> inside if compare")
            if(((resourceSkillData.objects[j].powerBuilder - baseSkillData.objects[i].powerBuilder) < 0)){
               // console.log("inside SkillGapSheet >>> inside addDeficitSkillData >>> inside if powerBuilder deficitSkillData[j] "+deficitSkillData[j])
               // console.log("inside SkillGapSheet >>> inside addDeficitSkillData >>> inside if powerBuilder trainingData[j] "+trainingData[j])                
                this.deficitSkillData[j].push({skillName: 'powerBuilder', skillDemand:baseSkillData.objects[i].powerBuilder,resourceSkill:resourceSkillData.objects[j].powerBuilder})
                this.trainingData[j].push('powerBuilder')
                
            }
            if(((resourceSkillData.objects[j].lotusNotesScripting - baseSkillData.objects[i].lotusNotesScripting) < 0)){                
                this.deficitSkillData[j].push({skillName: 'lotusNotesScripting', skillDemand:baseSkillData.objects[i].lotusNotesScripting,resourceSkill:resourceSkillData.objects[j].lotusNotesScripting})
                this.trainingData[j].push('lotusNotesScripting')
            }
            if(((resourceSkillData.objects[j].cobal_CICS - baseSkillData.objects[i].cobal_CICS) < 0)){
                this.deficitSkillData[j].push({skillName: 'cobal_CICS', skillDemand:baseSkillData.objects[i].cobal_CICS,resourceSkill:resourceSkillData.objects[j].cobal_CICS})
                this.trainingData[j].push('cobal_CICS')
            }
            if(((resourceSkillData.objects[j].ims_JCL - baseSkillData.objects[i].ims_JCL) < 0)){
                this.deficitSkillData[j].push({skillName: 'ims_JCL', skillDemand:baseSkillData.objects[i].ims_JCL,resourceSkill:resourceSkillData.objects[j].ims_JCL})
                this.trainingData[j].push('ims_JCL')
            }
            if(((resourceSkillData.objects[j].cpas - baseSkillData.objects[i].cpas) < 0)){
                this.deficitSkillData[j].push({skillName: 'cpas', skillDemand:baseSkillData.objects[i].cpas,resourceSkill:resourceSkillData.objects[j].cpas})
                this.trainingData[j].push('cpas')
            }
            if(((resourceSkillData.objects[j].filenetReportManager - baseSkillData.objects[i].filenetReportManager) < 0)){
                this.deficitSkillData[j].push({skillName: 'filenetReportManager', skillDemand:baseSkillData.objects[i].filenetReportManager,resourceSkill:resourceSkillData.objects[j].filenetReportManager})
                this.trainingData[j].push('filenetReportManager')
            }
            if(((resourceSkillData.objects[j].wdp_UI - baseSkillData.objects[i].wdp_UI) < 0)){
                this.deficitSkillData[j].push({skillName: 'wdp_UI', skillDemand:baseSkillData.objects[i].wdp_UI,resourceSkill:resourceSkillData.objects[j].wdp_UI})
                this.trainingData[j].push('wdp_UI')
            }
            if(((resourceSkillData.objects[j].wdp_MICROSERVICES - baseSkillData.objects[i].wdp_MICROSERVICES) < 0)){
                this.deficitSkillData[j].push({skillName: 'wdp_MICROSERVICES', skillDemand:baseSkillData.objects[i].wdp_MICROSERVICES,resourceSkill:resourceSkillData.objects[j].wdp_MICROSERVICES})
                this.trainingData[j].push('wdp_MICROSERVICES')
            }
            if(((resourceSkillData.objects[j].wdp_BPEL - baseSkillData.objects[i].wdp_BPEL) < 0)){
                this.deficitSkillData[j].push({skillName: 'wdp_BPEL', skillDemand:baseSkillData.objects[i].wdp_BPEL,resourceSkill:resourceSkillData.objects[j].wdp_BPEL})
                this.trainingData[j].push('wdp_BPEL')
            }
            if(((resourceSkillData.objects[j].wdp_BPM - baseSkillData.objects[i].wdp_BPM) < 0)){
                this.deficitSkillData[j].push({skillName: 'wdp_BPM', skillDemand:baseSkillData.objects[i].wdp_BPM,resourceSkill:resourceSkillData.objects[j].wdp_BPM})
                this.trainingData[j].push('wdp_BPM')
            }
            if(((resourceSkillData.objects[j].base24Tandem - baseSkillData.objects[i].base24Tandem) < 0)){
                this.deficitSkillData[j].push({skillName: 'base24Tandem', skillDemand:baseSkillData.objects[i].base24Tandem,resourceSkill:resourceSkillData.objects[j].base24Tandem})
                this.trainingData[j].push('base24Tandem')
            }
            if(((resourceSkillData.objects[j].filenetImageServer - baseSkillData.objects[i].filenetImageServer) < 0)){
                this.deficitSkillData[j].push({skillName: 'filenetImageServer', skillDemand:baseSkillData.objects[i].filenetImageServer,resourceSkill:resourceSkillData.objects[j].filenetImageServer})
                this.trainingData[j].push('filenetImageServer')
            }
            if(((resourceSkillData.objects[j].microsoftSQLServer - baseSkillData.objects[i].microsoftSQLServer) < 0)){
                this.deficitSkillData[j].push({skillName: 'microsoftSQLServer', skillDemand:baseSkillData.objects[i].microsoftSQLServer,resourceSkill:resourceSkillData.objects[j].microsoftSQLServer})
                this.trainingData[j].push('microsoftSQLServer')
            }
            if(((resourceSkillData.objects[j].java - baseSkillData.objects[i].java) < 0)){
                this.deficitSkillData[j].push({skillName: 'java', skillDemand:baseSkillData.objects[i].java,resourceSkill:resourceSkillData.objects[j].java})
                this.trainingData[j].push('java')
            }
            if(((resourceSkillData.objects[j].coding - baseSkillData.objects[i].coding) < 0)){
                this.deficitSkillData[j].push({skillName: 'coding', skillDemand:baseSkillData.objects[i].coding,resourceSkill:resourceSkillData.objects[j].coding})
                this.trainingData[j].push('coding')
            }
            if(((resourceSkillData.objects[j].analytcal - baseSkillData.objects[i].analytcal) < 0)){
                this.deficitSkillData[j].push({skillName: 'analytcal', skillDemand:baseSkillData.objects[i].analytcal,resourceSkill:resourceSkillData.objects[j].analytcal})
                this.trainingData[j].push('analytcal')
            }
            if(((resourceSkillData.objects[j].bootstrap - baseSkillData.objects[i].bootstrap) < 0)){
                this.deficitSkillData[j].push({skillName: 'bootstrap', skillDemand:baseSkillData.objects[i].bootstrap,resourceSkill:resourceSkillData.objects[j].bootstrap})
                this.trainingData[j].push('bootstrap')
            }
            if(((resourceSkillData.objects[j].csharpDOTNET - baseSkillData.objects[i].csharpDOTNET) < 0)){
                this.deficitSkillData[j].push({skillName: 'csharpDOTNET', skillDemand:baseSkillData.objects[i].csharpDOTNET,resourceSkill:resourceSkillData.objects[j].csharpDOTNET})
                this.trainingData[j].push('csharpDOTNET')
            }
            if(((resourceSkillData.objects[j].plsql - baseSkillData.objects[i].plsql) < 0)){
                this.deficitSkillData[j].push({skillName: 'plsql', skillDemand:baseSkillData.objects[i].plsql,resourceSkill:resourceSkillData.objects[j].plsql})
                this.trainingData[j].push('plsql')
            }
            if(((resourceSkillData.objects[j].unix - baseSkillData.objects[i].unix) < 0)){
                this.deficitSkillData[j].push({skillName: 'unix', skillDemand:baseSkillData.objects[i].unix,resourceSkill:resourceSkillData.objects[j].unix})
                this.trainingData[j].push('unix')
            }
            if(((resourceSkillData.objects[j].vbDOTNET - baseSkillData.objects[i].vbDOTNET) < 0)){
                this.deficitSkillData[j].push({skillName: 'vbDOTNET', skillDemand:baseSkillData.objects[i].vbDOTNET,resourceSkill:resourceSkillData.objects[j].vbDOTNET})
                this.trainingData[j].push('vbDOTNET')
            }
            if(((resourceSkillData.objects[j].webservice - baseSkillData.objects[i].webservice) < 0)){
                this.deficitSkillData[j].push({skillName: 'webservice', skillDemand:baseSkillData.objects[i].webservice,resourceSkill:resourceSkillData.objects[j].webservice})
                this.trainingData[j].push('webservice')
            }
            if(((resourceSkillData.objects[j].javascript - baseSkillData.objects[i].javascript) < 0)){
                this.deficitSkillData[j].push({skillName: 'javascript', skillDemand:baseSkillData.objects[i].javascript,resourceSkill:resourceSkillData.objects[j].javascript})
                this.trainingData[j].push('javascript')
            }
            if(((resourceSkillData.objects[j].hibernate - baseSkillData.objects[i].hibernate) < 0)){
                this.deficitSkillData[j].push({skillName: 'hibernate', skillDemand:baseSkillData.objects[i].hibernate,resourceSkill:resourceSkillData.objects[j].hibernate})
                this.trainingData[j].push('hibernate')
            }
            if(((resourceSkillData.objects[j].spring - baseSkillData.objects[i].spring) < 0)){
                this.deficitSkillData[j].push({skillName: 'spring', skillDemand:baseSkillData.objects[i].spring,resourceSkill:resourceSkillData.objects[j].spring})
                this.trainingData[j].push('spring')
            }
            if(((resourceSkillData.objects[j].ejb - baseSkillData.objects[i].ejb) < 0)){
                this.deficitSkillData[j].push({skillName: 'ejb', skillDemand:baseSkillData.objects[i].ejb,resourceSkill:resourceSkillData.objects[j].ejb})
                this.trainingData[j].push('ejb')
            }
            if(((resourceSkillData.objects[j].fileNet - baseSkillData.objects[i].fileNet) < 0)){
                this.deficitSkillData[j].push({skillName: 'fileNet', skillDemand:baseSkillData.objects[i].fileNet,resourceSkill:resourceSkillData.objects[j].fileNet})
                this.trainingData[j].push('fileNet')
            }
            if(((resourceSkillData.objects[j].j2ee - baseSkillData.objects[i].j2ee) < 0)){
                this.deficitSkillData[j].push({skillName: 'j2ee', skillDemand:baseSkillData.objects[i].j2ee,resourceSkill:resourceSkillData.objects[j].j2ee})
                this.trainingData[j].push('j2ee')
            }
            if(((resourceSkillData.objects[j].angularJS - baseSkillData.objects[i].angularJS) < 0)){
                this.deficitSkillData[j].push({skillName: 'angularJS', skillDemand:baseSkillData.objects[i].angularJS,resourceSkill:resourceSkillData.objects[j].angularJS})
                this.trainingData[j].push('angularJS')
            }
            if(((resourceSkillData.objects[j].websphereApplicationSever - baseSkillData.objects[i].websphereApplicationSever) < 0)){
                this.deficitSkillData[j].push({skillName: 'websphereApplicationSever', skillDemand:baseSkillData.objects[i].websphereApplicationSever,resourceSkill:resourceSkillData.objects[j].websphereApplicationSever})
                this.trainingData[j].push('websphereApplicationSever')
            }
            if(((resourceSkillData.objects[j].websphereMQ - baseSkillData.objects[i].websphereMQ) < 0)){
                this.deficitSkillData[j].push({skillName: 'websphereMQ', skillDemand:baseSkillData.objects[i].websphereMQ,resourceSkill:resourceSkillData.objects[j].websphereMQ})
                this.trainingData[j].push('websphereMQ')
            }
            if(((resourceSkillData.objects[j].xml - baseSkillData.objects[i].xml) < 0)){
                this.deficitSkillData[j].push({skillName: 'xml', skillDemand:baseSkillData.objects[i].xml,resourceSkill:resourceSkillData.objects[j].xml})
                this.trainingData[j].push('xml')
            }
            if(((resourceSkillData.objects[j].splunk - baseSkillData.objects[i].splunk) < 0)){
                this.deficitSkillData[j].push({skillName: 'splunk', skillDemand:baseSkillData.objects[i].splunk,resourceSkill:resourceSkillData.objects[j].splunk})
                this.trainingData[j].push('splunk')
            }
            if(((resourceSkillData.objects[j].tallymanConfiguration - baseSkillData.objects[i].tallymanConfiguration) < 0)){
                this.deficitSkillData[j].push({skillName: 'tallymanConfiguration', skillDemand:baseSkillData.objects[i].tallymanConfiguration,resourceSkill:resourceSkillData.objects[j].tallymanConfiguration})
                this.trainingData[j].push('tallymanConfiguration')
            }
            if(((resourceSkillData.objects[j].devops - baseSkillData.objects[i].devops) < 0)){
                this.deficitSkillData[j].push({skillName: 'devops', skillDemand:baseSkillData.objects[i].devops,resourceSkill:resourceSkillData.objects[j].devops})
                this.trainingData[j].push('devops')
            }
            if(((resourceSkillData.objects[j].db2_sql - baseSkillData.objects[i].db2_sql) < 0)){
                this.deficitSkillData[j].push({skillName: 'db2_sql', skillDemand:baseSkillData.objects[i].db2_sql,resourceSkill:resourceSkillData.objects[j].db2_sql})
                this.trainingData[j].push('db2_sql')
            }
            if(((resourceSkillData.objects[j].controlM - baseSkillData.objects[i].controlM) < 0)){
                this.deficitSkillData[j].push({skillName: 'controlM', skillDemand:baseSkillData.objects[i].controlM,resourceSkill:resourceSkillData.objects[j].controlM})
                this.trainingData[j].push('controlM')
            }
            if(((resourceSkillData.objects[j].html - baseSkillData.objects[i].html) < 0)){
                this.deficitSkillData[j].push({skillName: 'html', skillDemand:baseSkillData.objects[i].html,resourceSkill:resourceSkillData.objects[j].html})
                this.trainingData[j].push('html')
            }
            if(((resourceSkillData.objects[j].jenkins - baseSkillData.objects[i].jenkins) < 0)){
                this.deficitSkillData[j].push({skillName: 'jenkins', skillDemand:baseSkillData.objects[i].jenkins,resourceSkill:resourceSkillData.objects[j].jenkins})
                this.trainingData[j].push('jenkins')
            }
            if(((resourceSkillData.objects[j].financialServiceoverview - baseSkillData.objects[i].financialServiceoverview) < 0)){
                this.deficitSkillData[j].push({skillName: 'financialServiceoverview', skillDemand:baseSkillData.objects[i].financialServiceoverview,resourceSkill:resourceSkillData.objects[j].financialServiceoverview})
                this.trainingData[j].push('financialServiceoverview')
            }
            if(((resourceSkillData.objects[j].cards - baseSkillData.objects[i].cards) < 0)){
                this.deficitSkillData[j].push({skillName: 'cards', skillDemand:baseSkillData.objects[i].cards,resourceSkill:resourceSkillData.objects[j].cards})
                this.trainingData[j].push('cards')
            }
            if(((resourceSkillData.objects[j].ticketResolution - baseSkillData.objects[i].ticketResolution) < 0)){
                this.deficitSkillData[j].push({skillName: 'ticketResolution', skillDemand:baseSkillData.objects[i].ticketResolution,resourceSkill:resourceSkillData.objects[j].ticketResolution})
                this.trainingData[j].push('ticketResolution')
            }
            if(((resourceSkillData.objects[j].jobMonitoring - baseSkillData.objects[i].jobMonitoring) < 0)){
                this.deficitSkillData[j].push({skillName: 'jobMonitoring', skillDemand:baseSkillData.objects[i].jobMonitoring,resourceSkill:resourceSkillData.objects[j].jobMonitoring})
                this.trainingData[j].push('jobMonitoring')
            }
            if(((resourceSkillData.objects[j].lowLevelDesign - baseSkillData.objects[i].lowLevelDesign) < 0)){
                this.deficitSkillData[j].push({skillName: 'lowLevelDesign', skillDemand:baseSkillData.objects[i].lowLevelDesign,resourceSkill:resourceSkillData.objects[j].lowLevelDesign})
                this.trainingData[j].push('lowLevelDesign')
            }
            if(((resourceSkillData.objects[j].minorBAUWork - baseSkillData.objects[i].minorBAUWork) < 0)){
                this.deficitSkillData[j].push({skillName: 'minorBAUWork', skillDemand:baseSkillData.objects[i].minorBAUWork,resourceSkill:resourceSkillData.objects[j].minorBAUWork})
                this.trainingData[j].push('minorBAUWork')   
            }
            if(((resourceSkillData.objects[j].deployment - baseSkillData.objects[i].deployment) < 0)){
                this.deficitSkillData[j].push({skillName: 'deployment', skillDemand:baseSkillData.objects[i].deployment,resourceSkill:resourceSkillData.objects[j].deployment})
                this.trainingData[j].push('deployment')
            }
            if(((resourceSkillData.objects[j].testing - baseSkillData.objects[i].testing) < 0)){
                this.deficitSkillData[j].push({skillName: 'testing', skillDemand:baseSkillData.objects[i].testing,resourceSkill:resourceSkillData.objects[j].testing})
                this.trainingData[j].push('testing')
            }
            if(((resourceSkillData.objects[j].architecture - baseSkillData.objects[i].architecture) < 0)){
                this.deficitSkillData[j].push({skillName: 'architecture', skillDemand:baseSkillData.objects[i].architecture,resourceSkill:resourceSkillData.objects[j].architecture})
                this.trainingData[j].push('architecture')
            }
            if(((resourceSkillData.objects[j].featuresFunctionalites - baseSkillData.objects[i].featuresFunctionalites) < 0)){
                this.deficitSkillData[j].push({skillName: 'featuresFunctionalites', skillDemand:baseSkillData.objects[i].featuresFunctionalites,resourceSkill:resourceSkillData.objects[j].featuresFunctionalites})
                this.trainingData[j].push('featuresFunctionalites')
            }
            if(((resourceSkillData.objects[j].codeComplexity - baseSkillData.objects[i].codeComplexity) < 0)){
                this.deficitSkillData[j].push({skillName: 'codeComplexity', skillDemand:baseSkillData.objects[i].codeComplexity,resourceSkill:resourceSkillData.objects[j].codeComplexity})
                this.trainingData[j].push('codeComplexity')
            }
            if(((resourceSkillData.objects[j].interfacing - baseSkillData.objects[i].interfacing) < 0)){
                this.deficitSkillData[j].push({skillName: 'interfacing', skillDemand:baseSkillData.objects[i].interfacing,resourceSkill:resourceSkillData.objects[j].interfacing})
                this.trainingData[j].push('interfacing')
            }
            if(((resourceSkillData.objects[j].deployment2 - baseSkillData.objects[i].deployment2) < 0)){
                this.deficitSkillData[j].push({skillName: 'deployment2', skillDemand:baseSkillData.objects[i].deployment2,resourceSkill:resourceSkillData.objects[j].deployment2})
                this.trainingData[j].push('deployment2')
            }
            if(((resourceSkillData.objects[j].requirementAnalysis - baseSkillData.objects[i].requirementAnalysis) < 0)){
                this.deficitSkillData[j].push({skillName: 'requirementAnalysis', skillDemand:baseSkillData.objects[i].requirementAnalysis,resourceSkill:resourceSkillData.objects[j].requirementAnalysis})
                this.trainingData[j].push('requirementAnalysis')
            }            
        }
        this.trainingData[j].push('}')
    }
    }
    this.trainingData= JSON.parse("["+JSON.stringify(this.trainingData)+"]")
   // console.log("inside class SkillGapSheet >>> function addDeficitSkillData >>> deficitSkillData"+this.deficitSkillData+" and training data "+this.trainingData)
    return this.deficitSkillData
    }
  addTableData() {

  const {baseSkillData, resourceSkillData} = this.props.data
  //console.log("inside SkillGapSheet >>> inside addTableData >>> baseSkillData "+JSON.stringify(baseSkillData))
  //console.log("inside SkillGapSheet >>> inside addTableData >>> resourceSkillData "+JSON.stringify(resourceSkillData))
  for(var i=0;i<baseSkillData.totalRecords;i++){
  //**  console.log("inside SkillGapSheet >>> inside addTableData >>> inside outer loop")
        for(var j=0;j<resourceSkillData.totalRecords;j++){   
        //**    console.log("inside SkillGapSheet >>> inside addTableData >>> inside innner loop")
           // console.log("inside SkillGapSheet >>> inside addTableData >>> baseSkillData "+JSON.stringify(baseSkillData))
           // console.log("inside SkillGapSheet >>> inside addTableData >>> resourceSkillData "+JSON.stringify(resourceSkillData))        
            if((resourceSkillData.objects[j].applicationName === baseSkillData.objects[i].applicationName) && (resourceSkillData.objects[j].moduleName === baseSkillData.objects[i].moduleName) && (resourceSkillData.objects[j].programName === baseSkillData.objects[i].programName))
            {   
              //**  console.log("inside SkillGapSheet >>> inside addTableData >>> inside if compare")
                var deficitSkill = this.addDeficitSKillData()[j]
                var trainings = deficitSkill.map(function(training){
                  return training.skillName
                })
                // console.log("---------------------------------------------------------------------------------------------")
                // console.log("tableData >>> deficitSkill "+JSON.stringify(deficitSkill))
                // console.log("tableData >>> trainings "+JSON.stringify(trainings))
                // console.log("---------------------------------------------------------------------------------------------")
                this.tableData.push({
                    resourceName : resourceSkillData.objects[j].resourceName,
                    applicationName : resourceSkillData.objects[j].applicationName,
                    moduleName: resourceSkillData.objects[j].moduleName,
                    programName : resourceSkillData.objects[j].programName,
                    deficitSkill :  deficitSkill,
                    trainingsRequired : trainings
                })
            }
        }
    }
   // console.log("inside SKillGapSheet >>> inside addTableData >>> tableData "+this.tableData)
    return this.tableData
 }

  handleExportCSVButtonClick = (onClick) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    console.log('This is my custom function for ExportCSVButton click event');
    onClick();
  }

  createCustomExportCSVButton = (onClick) => {
    return (
      <ExportCSVButton
        btnText='CustomExportText'
        btnContextual='btn-danger'
        className='my-custom-class'
        btnGlyphicon='glyphicon-edit'
        onClick={ e => this.handleExportCSVButtonClick(onClick) }/>
    );
    // If you want have more power to custom the child of ExportCSVButton,
    // you can do it like following
    // return (
    //   <ExportCSVButton
    //     btnContextual='btn-warning'
    //     className='my-custom-class'
    //     onClick={ () => this.handleExportCSVButtonClick(onClick) }>
    //     { ... }
    //   </ExportCSVButton>
    // );
  }

  handleAfterSearch = (searchText, result) => {
    if (searchText === '') {
      this.refs.table.cleanSelected();
    }
}
createCustomSearchField = (props) => {
    return (
      <SearchField
        className='my-custom-class'
        defaultValue={ props.defaultSearch }
        placeholder={ props.searchPlaceholder }/>
    );
  }

  isExpandableRow = (row) => {
    if (row.id != '') return true;
      else return false;
  }  


  handleExpand(rowKey, isExpand, e) {
    if (isExpand) {
      console.log(`row: ${rowKey} is ready to expand`);
    } else {
      console.log(`row: ${rowKey} is ready to collapse`);
    }
    console.log(e);
  }

  expandColumnComponent = ({ isExpandableRow, isExpanded }) => {
    let content = '';

    if (isExpandableRow) {
      content = (isExpanded ? '(-)' : '(+)' );
    } else {
      content = ' ';
    }
    return (
      <div> { content } </div>
    );
  }

  expandComponent(row) {
      console.log("-----------------------------------------------------------------------------------------------------")
      console.log("inside class SkillGapSheet >>> inside function expandComponent >>> row.deficitSkill "+JSON.stringify(row.deficitSkill))
      console.log("-----------------------------------------------------------------------------------------------------")
    return (
      <BootstrapTable data={ row.deficitSkill }>
         <TableHeaderColumn dataField='skillName' isKey={true} width='35%' dataAlign='center'>Skill Name</TableHeaderColumn>
         <TableHeaderColumn dataField='skillDemand' width='30%' dataAlign='center'>Skill Demand</TableHeaderColumn>
          <TableHeaderColumn dataField='resourceSkill' width='30%' dataAlign='center'>Resource Skill</TableHeaderColumn>
      </BootstrapTable>
    );
  }

  render() {
    const options = {
      exportCSVBtn: this.createCustomExportCSVButton,
      expandRowBgColor: 'rgb(66, 134, 244)',
      expanding: this.state.expanding,
      onExpand: this.handleExpand,
      clearSearch: true,
      searchField: this.createCustomSearchField,
      afterSearch: this.handleAfterSearch,
    };
    return (
        <div>
            <NavProfile/>  
            <div className="container__profile-data">
                <div className="profile-data">
                    <BootstrapTable data={ this.addTableData() } ref='table' options={ options } search={true} exportCSV striped hover condensed  
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ this.expandComponent }
                            expandColumnOptions={ { 
                            expandColumnVisible: true,                            
                            columnWidth: 50,
                            expandColumnBeforeSelectColumn: false                            
                             } }
                    >
                        <TableHeaderColumn dataField='resourceName' isKey={ true }>Resource Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='applicationName'>Application Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='moduleName'>Module Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='programName'>Program Name</TableHeaderColumn>
                        {/* <TableHeaderColumn dataField='deficitSkills.skillName'>Skill Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='deficitSkills.skillDemand'>Skill Demand</TableHeaderColumn>
                        <TableHeaderColumn dataField='deficitSkills.resourceSkill'>Resource Skill</TableHeaderColumn> */}
                        <TableHeaderColumn dataField='trainingsRequired'>Trainings Required</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </div>
    );
  }
}
function select(state) {
    return {
      data: state
    };
  }
  
export default connect(select)(SkillGapSheet);