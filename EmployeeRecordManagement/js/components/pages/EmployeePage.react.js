import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, striped, hover, condensed, bordered } from "react-bootstrap-table";
import { Table } from "react-bootstrap";
import fs from "fs";
import NavProfile from "../NavProfile.react";
import Modal from "../Modal.react";
import RegisterPage from "../pages/RegisterPage.react";
import AddRecordPage from "../AddRecordPage.react";
import UpdateRecordPage from "../UpdateRecordPage.react";
import { toggleModalTrue, toggleModalFalse, allData, deleteProfileRecord, changeUpdateProfileForm, isRecordSelected, baseSkillDataAction, resourceSkillDataAction, setresourceSkillData} from '../../actions/AppActions';
import { DeleteRecordPage } from "../DeleteRecordPage.react";
import { Button } from "react-bootstrap";
import { browserHistory } from "react-router";
import xls from "xlsx";
var ScrollArea = require('react-scrollbar');
const assign = Object.assign || require('object.assign');

export default class EmployeePage extends Component{

    componentDidMount(){
        this.props.dispatch(baseSkillDataAction())
        this.props.dispatch(resourceSkillDataAction())                        
        }
      handleAfterSearch = (searchText, result) => {
        if (searchText === '') {
          this.refs.table.cleanSelected();
          this.rowEmail=''
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

    expandComponent = (row) => {
        const {baseSkillData} =this.props.data
        //  const {resourceSkillData} =this.props.data;
        //  console.log("inside EmployeePage >>> inside expandComponent "+JSON.stringify(row))
        //  console.log("inside EmployeePage >>> inside expandComponent >>>rowid")
        //  console.log(" this.props.data >>> "+JSON.stringify(this.props.data))
        //  console.log("inside EmployeePage >>> inside expandComponent >>> baseskilljson"+JSON.stringify(baseSkillData.objects))
        var jsonString = "["+ JSON.stringify(row) + "]"
        var jsonObj = JSON.parse(jsonString)
        // console.log(jsonObj)
            var rows = []

            // (baseSkillData.objects).map((baseSkillItem,index) => {
            // console.log("inside EMployeePage >>> baseskilldata >>> value "+baseSkillItem)

    for(var i=0;i<baseSkillData.totalRecords;i++)
    {  // console.log("row.applicationName >>> "+row.applicationName)
    //&& (row.moduleName === baseSkillData.objects[i].moduleName) && (row.programName === baseSkillData.objects[i].programName
        if(row.applicationName === baseSkillData.objects[i].applicationName){
                rows.push(<BootstrapTable data={ JSON.parse("["+JSON.stringify(baseSkillData.objects[i])+"]") }>
                {/* <TableHeaderColumn colspan='3' dataSort csvHeader='Skills Demand' headerAlign='right'>Skills Demand</TableHeaderColumn> */}
               <TableHeaderColumn dataField='powerBuilder' isKey={true} >Power Builder</TableHeaderColumn>
               <TableHeaderColumn dataField='lotusNotesScripting' width='200px' >Lotus Notes Scripting</TableHeaderColumn>
               <TableHeaderColumn dataField='cobal_CICS' width='200px' >COBAL_CICS</TableHeaderColumn>
               <TableHeaderColumn dataField='ims_JCL' width='200px' >IMS_JCL</TableHeaderColumn>
               <TableHeaderColumn dataField='cpas' width='200px' >CPAS</TableHeaderColumn>
               <TableHeaderColumn dataField='filenetReportManager' width='200px' >Filenet Report Manager</TableHeaderColumn>
               <TableHeaderColumn dataField='wdp_UI' width='200px' >WDP_UI</TableHeaderColumn>
               <TableHeaderColumn dataField='wdp_MICROSERVICES' width='200px' >WDP_MICROSERVICES</TableHeaderColumn>
               <TableHeaderColumn dataField='wdp_BPEL' width='200px' >WDP_BPEL</TableHeaderColumn>
               <TableHeaderColumn dataField='wdp_BPM' width='200px' >WDP_BPM</TableHeaderColumn>
               <TableHeaderColumn dataField='base24Tandem' width='200px' >Base24(Tandem)</TableHeaderColumn>
               <TableHeaderColumn dataField='filenetImageServer'width='200px' >Filenet Image Server</TableHeaderColumn>
               <TableHeaderColumn dataField='microsoftSQLServer' width='200px' >Microsoft SQL Server</TableHeaderColumn>
               <TableHeaderColumn dataField='java' width='200px' >Java</TableHeaderColumn>
               <TableHeaderColumn dataField='coding' width='200px' >Coding</TableHeaderColumn>
               <TableHeaderColumn dataField='analytcal' width='200px' >Analytical</TableHeaderColumn>
               <TableHeaderColumn dataField='bootstrap' width='200px' >Bootstrap</TableHeaderColumn>
               <TableHeaderColumn dataField='csharpDOTNET' width='200px' >Csharp .Net</TableHeaderColumn>
               <TableHeaderColumn dataField='plsql' width='200px' >PlSQL</TableHeaderColumn>
               <TableHeaderColumn dataField='unix'  width='200px' >Unix</TableHeaderColumn>
               <TableHeaderColumn dataField='vbDOTNET' width='200px' >VB .NET</TableHeaderColumn>
               <TableHeaderColumn dataField='webservice' width='200px' >Webservice</TableHeaderColumn>
               <TableHeaderColumn dataField='javascript'width='200px' >Javascript</TableHeaderColumn>
               <TableHeaderColumn dataField='hibernate'width='200px' >Hibernate</TableHeaderColumn>
               <TableHeaderColumn dataField='spring' width='200px' >Spring</TableHeaderColumn>
               <TableHeaderColumn dataField='ejb' width='200px' >EJB</TableHeaderColumn>
               <TableHeaderColumn dataField='fileNet' width='200px' >Filenet</TableHeaderColumn>
               <TableHeaderColumn dataField='j2ee' width='200px' >J2EE</TableHeaderColumn>
               <TableHeaderColumn dataField='angularJS' width='200px' >Angular js</TableHeaderColumn>
               <TableHeaderColumn dataField='websphereApplicationSever'width='200px' >Websphere Application Server</TableHeaderColumn>
               <TableHeaderColumn dataField='websphereMQ' width='200px' >Websphere MQ</TableHeaderColumn>
               <TableHeaderColumn dataField='xml' width='200px' >XML</TableHeaderColumn>
               <TableHeaderColumn dataField='splunk' width='200px' >Splunk</TableHeaderColumn>
               <TableHeaderColumn dataField='tallymanConfiguration'width='200px' >Tallyman Configuration</TableHeaderColumn>
               <TableHeaderColumn dataField='devops' width='200px' >DevOps</TableHeaderColumn>
               <TableHeaderColumn dataField='db2_sql'width='200px' >Db2_SQL</TableHeaderColumn>
               <TableHeaderColumn dataField='controlM'width='200px' >ControlM</TableHeaderColumn>
               <TableHeaderColumn dataField='html'width='200px' >HTML</TableHeaderColumn>
               <TableHeaderColumn dataField='jenkins'width='200px' >Jenkins</TableHeaderColumn>
               <TableHeaderColumn dataField='financialServiceoverview' width='200px' >FInancial Service Overview</TableHeaderColumn>
               <TableHeaderColumn dataField='cards' width='200px' >Cards</TableHeaderColumn>
               <TableHeaderColumn dataField='ticketResolution' width='200px' >Ticket Resolution</TableHeaderColumn>
               <TableHeaderColumn dataField='jobMonitoring' width='200px' >Job Monitoring</TableHeaderColumn>
               <TableHeaderColumn dataField='lowLevelDesign' width='200px' >Low Level Design</TableHeaderColumn>
               <TableHeaderColumn dataField='minorBAUWork' width='200px' >Minor BAU Work</TableHeaderColumn>
               <TableHeaderColumn dataField='deployment' width='200px' >Deployment</TableHeaderColumn>
               <TableHeaderColumn dataField='testing' width='200px' >Testing</TableHeaderColumn>
               <TableHeaderColumn dataField='architecture' width='200px' >Architecture</TableHeaderColumn>
               <TableHeaderColumn dataField='featuresFunctionalites' width='200px' >Features Functionalities</TableHeaderColumn>
               <TableHeaderColumn dataField='codeComplexity' width='200px' >Code Complexity</TableHeaderColumn>
               <TableHeaderColumn dataField='interfacing' width='200px' >Interfacing</TableHeaderColumn>
               <TableHeaderColumn dataField='deployment2' width='200px' >Deployment2</TableHeaderColumn>
               <TableHeaderColumn dataField='requirementAnalysis' width='200px' >Requirement Analysis</TableHeaderColumn>
                </BootstrapTable>)
            }
        }
        return (
            <div>
            <div  className="text-justify" className="font-weight-bold" className="p-3 mb-2 bg-info text-white">Skills Demand</div>
            {rows}  
            <div  className="text-justify" className="font-weight-bold" className="p-3 mb-2 bg-info text-white">Resource Skills</div>
            <BootstrapTable data={ jsonObj }>
            {/* <TableHeaderColumn row='0' colSpan='3' dataSort csvHeader='Resource Skills' headerAlign='right'>Resource Skills</TableHeaderColumn> */}
            <TableHeaderColumn dataField='powerBuilder' isKey={true} columnClassName ={columnClassNameFormat} editableByCell={checkEditable}  dataFormat={ skillColorFormatterpowerBuilder }>Power Builder</TableHeaderColumn>
            <TableHeaderColumn dataField='lotusNotesScripting' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterlotusNotesScripting }>Lotus Notes Scripting</TableHeaderColumn>
            <TableHeaderColumn dataField='cobal_CICS' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattercobal_CICS }>COBAL_CICS</TableHeaderColumn>
            <TableHeaderColumn dataField='ims_JCL' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterims_JCL }>IMS_JCL</TableHeaderColumn>
            <TableHeaderColumn dataField='cpas' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattercpas }>CPAS</TableHeaderColumn>
            <TableHeaderColumn dataField='filenetReportManager' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterfilenetReportManager }>Filenet Report Manager</TableHeaderColumn>
            <TableHeaderColumn dataField='wdp_UI' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterwdp_UI }>WDP_UI</TableHeaderColumn>
            <TableHeaderColumn dataField='wdp_MICROSERVICES' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterwdp_MICROSERVICES }>WDP_MICROSERVICES</TableHeaderColumn>
            <TableHeaderColumn dataField='wdp_BPEL' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterwdp_BPEL }>WDP_BPEL</TableHeaderColumn>
            <TableHeaderColumn dataField='wdp_BPM' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterwdp_BPM }>WDP_BPM</TableHeaderColumn>
            <TableHeaderColumn dataField='base24Tandem' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterbase24Tandem }>Base24(Tandem)</TableHeaderColumn>
            <TableHeaderColumn dataField='filenetImageServer'width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterfilenetImageServer}>Filenet Image Server</TableHeaderColumn>
            <TableHeaderColumn dataField='microsoftSQLServer' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattermicrosoftSQLServer }>Microsoft SQL Server</TableHeaderColumn>
            <TableHeaderColumn dataField='java' width='200px' editableByCell={checkEditable} dataFormat={ skillColorFormatterjava } columnClassName ={columnClassNameFormat}>Java</TableHeaderColumn>
            <TableHeaderColumn dataField='coding' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattercoding }>Coding</TableHeaderColumn>
            <TableHeaderColumn dataField='analytcal' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatteranalytcal }>Analytical</TableHeaderColumn>
            <TableHeaderColumn dataField='bootstrap' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterbootstrap }>Bootstrap</TableHeaderColumn>
            <TableHeaderColumn dataField='csharpDOTNET' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattercsharpDOTNET }>Csharp .Net</TableHeaderColumn>
            <TableHeaderColumn dataField='plsql' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterplsql }>PlSQL</TableHeaderColumn>
            <TableHeaderColumn dataField='unix' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterunix }>Unix</TableHeaderColumn>
            <TableHeaderColumn dataField='vbDOTNET' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattervbDOTNET }>VB .NET</TableHeaderColumn>
            <TableHeaderColumn dataField='webservice' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterwebservice }>Webservice</TableHeaderColumn>
            <TableHeaderColumn dataField='javascript'width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterjavascript }>Javascript</TableHeaderColumn>
            <TableHeaderColumn dataField='hibernate'width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterhibernate }>Hibernate</TableHeaderColumn>
            <TableHeaderColumn dataField='spring' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterspring }>Spring</TableHeaderColumn>
            <TableHeaderColumn dataField='ejb' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterejb }>EJB</TableHeaderColumn>
            <TableHeaderColumn dataField='fileNet' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterfileNet }>Filenet</TableHeaderColumn>
            <TableHeaderColumn dataField='j2ee' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterj2ee }>J2EE</TableHeaderColumn>
            <TableHeaderColumn dataField='angularJS' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterangularJS }>Angular js</TableHeaderColumn>
            <TableHeaderColumn dataField='websphereApplicationSever'width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterwebsphereApplicationSever }>Websphere Application Server</TableHeaderColumn>
            <TableHeaderColumn dataField='websphereMQ' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterwebsphereMQ }>Websphere MQ</TableHeaderColumn>
            <TableHeaderColumn dataField='xml' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterxml }>XML</TableHeaderColumn>
            <TableHeaderColumn dataField='splunk' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattersplunk }>Splunk</TableHeaderColumn>
            <TableHeaderColumn dataField='tallymanConfiguration'width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattertallymanConfiguration }>Tallyman Configuration</TableHeaderColumn>
            <TableHeaderColumn dataField='devops' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterdevops }>DevOps</TableHeaderColumn>
            <TableHeaderColumn dataField='db2_sql'width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterdb2_sql }>Db2_SQL</TableHeaderColumn>
            <TableHeaderColumn dataField='controlM'width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattercontrolM }>ControlM</TableHeaderColumn>
            <TableHeaderColumn dataField='html'width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterhtml }>HTML</TableHeaderColumn>
            <TableHeaderColumn dataField='jenkins'width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterjenkins }>Jenkins</TableHeaderColumn>
            <TableHeaderColumn dataField='financialServiceoverview' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterfinancialServiceoverview }>FInancial Service Overview</TableHeaderColumn>
            <TableHeaderColumn dataField='cards' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattercards }>Cards</TableHeaderColumn>
            <TableHeaderColumn dataField='ticketResolution' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterticketResolution }>Ticket Resolution</TableHeaderColumn>
            <TableHeaderColumn dataField='jobMonitoring' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterjobMonitoring }>Job Monitoring</TableHeaderColumn>
            <TableHeaderColumn dataField='lowLevelDesign' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterlowLevelDesign }>Low Level Design</TableHeaderColumn>
            <TableHeaderColumn dataField='minorBAUWork' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterminorBAUWork }>Minor BAU Work</TableHeaderColumn>
            <TableHeaderColumn dataField='deployment' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterdeployment }>Deployment</TableHeaderColumn>
            <TableHeaderColumn dataField='testing' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattertesting }>Testing</TableHeaderColumn>
            <TableHeaderColumn dataField='architecture' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterarchitecture }>Architecture</TableHeaderColumn>
            <TableHeaderColumn dataField='featuresFunctionalites' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterfeaturesFunctionalites }>Features Functionalities</TableHeaderColumn>
            <TableHeaderColumn dataField='codeComplexity' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormattercodeComplexity }>Code Complexity</TableHeaderColumn>
            <TableHeaderColumn dataField='interfacing' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterinterfacing }>Interfacing</TableHeaderColumn>
            <TableHeaderColumn dataField='deployment2' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterdeployment2 }>Deployment2</TableHeaderColumn>
            <TableHeaderColumn dataField='requirementAnalysis' width='200px' columnClassName ={columnClassNameFormat} editableByCell={checkEditable} dataFormat={ skillColorFormatterrequirementAnalysis }>Requirement Analysis</TableHeaderColumn>            
            </BootstrapTable>       
            </div>             
           );   
        //    $('#bottom').on('scroll', function () {
        //    $('#top').scrollTop($(this).scrollTop());
        // });         
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

    renderShowsTotal(start, to, total) {
        return (
            <p style={ { color: 'blue' } }>
            From { start } to { to }, total is { total }
            </p>
        );
        }

    render(){   
        const {resourceSkillData} = this.props.data;           
     //   console.log("inside EmployeePage >>> inside render"+JSON.stringify(resourceSkillData.objects))
     //   console.log("inside EmployeePage >>> inside render >>> length"+resourceSkillData.totalRecords)
        const options = {
            clearSearch: true,
            searchField: this.createCustomSearchField,
            afterSearch: this.handleAfterSearch,
            expandcell: 'rgb(66, 134, 244)',
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
              text: '5', value: 5
            }, {
              text: '10', value: 10
            }, {
              text: 'All', value: resourceSkillData.totalRecords
            } ], // you can change the dropdown list for size per page
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            prePageTitle: 'Go to previous', // Previous page button title
            nextPageTitle: 'Go to next', // Next page button title
            firstPageTitle: 'Go to first', // First page button title
            lastPageTitle: 'Go to Last', // Last page button title
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'top',  // default is bottom, top and both is all available
            // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            // hidePageListOnlyOnePage: true > Hide the page list if only one page.
           // bgColor: this.changeColor
          };
        return(
            <div>
                <NavProfile/>  
                <div className="container__profile-data">
                    <div className="profile-data">                  
                        <BootstrapTable ref='table' data={resourceSkillData.objects} 
                        // trClassName={ trClassFormat }
                            search={true} select striped hover condensed
                            options={options} 
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ this.expandComponent }
                            expandColumnOptions={ { 
                            expandColumnVisible: true,                            
                            columnWidth: 50,
                            expandColumnBeforeSelectColumn: false
                             } } pagination={true}
                        >                                                                                                                     
                            {/* <TableHeaderColumn  dataField='EmpNo' isKey={true} expandable={true} width="13%" dataAlign='center' className={columnClassNameFormat}>Employee Number</TableHeaderColumn> */}
                            <TableHeaderColumn  dataField='resourceName' isKey={true} expandable={true} width="20%" dataAlign='center'>Resource Name</TableHeaderColumn>
                            <TableHeaderColumn  dataField='role' width="15%" dataAlign='center' >Role</TableHeaderColumn>                            
                            <TableHeaderColumn  dataField='applicationName' width="18%" dataAlign='center'>Application Name</TableHeaderColumn>
                            <TableHeaderColumn  dataField='moduleName' width="18%" dataAlign='center'>Module Name</TableHeaderColumn>
                            <TableHeaderColumn  dataField='programName' width='18%' dataAlign='center'>Program Name</TableHeaderColumn>                            
                        </BootstrapTable>                       
                    </div>
                </div>
            </div>
        );
    }   
}

export function skillColorFormatterpowerBuilder(cell, row){
    if(cell===((3 || 0) || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterlotusNotesScripting(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattercobal_CICS(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterims_JCL(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattercpas(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterfilenetReportManager(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterwdp_UI(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterwdp_MICROSERVICES(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterwdp_BPEL(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterwdp_BPM(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterbase24Tandem(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterfilenetImageServer(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattermicrosoftSQLServer(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterjava(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattercoding(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatteranalytcal(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterbootstrap(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattercsharpDOTNET(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterplsql(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterunix(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattervbDOTNET(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterwebservice(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterjavascript(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterhibernate(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterspring(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterejb(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterfileNet(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterj2ee(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterangularJS(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterwebsphereApplicationSever(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterwebsphereMQ(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterxml(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattersplunk(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattertallymanConfiguration(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterdevops(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterdb2_sql(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattercontrolM(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===(3 || 0))
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterhtml(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterjenkins(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterfinancialServiceoverview(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattercards(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterticketResolution(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterjobMonitoring(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterlowLevelDesign(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterminorBAUWork(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterdeployment(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattertesting(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterarchitecture(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterfeaturesFunctionalites(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormattercodeComplexity(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterinterfacing(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterdeployment2(cell, row){
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};

export function skillColorFormatterrequirementAnalysis(cell, row){
//console.log("================================ "+JSON.stringify(row))
    if(cell===(3 || 0))
    return `<div class='skill-deficit'>${cell}</div>`;
    else if(cell===6)
    return `<div class='skill-surplus'>${cell}</div>`
    else if(cell===9)
    return `<div class='skill-sufficient'>${cell}</div>`
};


export function baseskillColorFormat(cell, row){

}

export function checkEditable(cell) {
    // return true or false

    }
export function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
    // fieldValue is column value
    // row is whole row object
    // rowIdx is index of row
    // colIdx is index of column
    //return row['Resource Name'] === 'Chethana Rudraraju' ? 'td-column-function-even-example' : 'td-column-function-odd-example';
   // return  ? 'skill-deficit' : 'skill-sufficient';
}

// export function trClassFormat(rowData, rIndex) {
//     return rowData['Resource Name'] === 'Chethana Rudraraju'? 'tr-function-example' : '';
//   }


function select(state) {
    return {
      data: state
    };
  }
  
export default connect(select)(EmployeePage);