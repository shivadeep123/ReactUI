import { render } from "react-dom";
import  React, {Component} from "react";
import axios from 'axios';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from "react-fusioncharts";


  // Pass fusioncharts as a dependency of charts
  charts(FusionCharts)

export default class Metrics extends Component{
  myDataSource =''
  componentDidMount(){
   this.getData();
  }
    chartData = {
      chart: {},
      data: [{value: 100}, {value: 200}, {value: 300}]
  };
  myDataSource={chart:{caption:"Technicalknowledge",subcaption:"Last Year",startingangle:"120",showlabels:"0",showlegend:"1",enablemultislicing:"0",slicingdistance:"15",showpercentvalues:"1",showpercentintooltip:"0",plottooltext:"Age group : $label Total visit : $datavalue",theme:"ocean"},data:[{label:"Hibernate",value:10},{label:"Java",value:5},{label:"J2EE",value:12},{label:"Javascript",value:9}]}

    render(){

        //const {profileData} = this.props.data;
        console.log("inside metrics >>> render")
        console.log("myDataSource "+this.myDataSource)
        return(
        <div>
        <ReactFC
        // type = "Column2D"
        // className = "fc-column2d"  // ReactJS attribute-name for DOM classes
        // dataFormat = "JSON"
        // dataSource = {this.chartData}
        id= "pie_chart"
        type= "pie3d" 
        width="80%"
        height={400}
        dataFormat="JSON"
        dataSource={this.myDataSource}       
        />
      </div>
        )
    }
    getData(){
      axios.get('./EmpData.json').then((response) => {
        console.log(response.data)
        this.myDataSource={chart:{caption:"Technicalknowledge",subcaption:"Last Year",startingangle:"120",showlabels:"0",showlegend:"1",enablemultislicing:"0",slicingdistance:"15",showpercentvalues:"1",showpercentintooltip:"0",plottooltext:"Age group : $label Total visit : $datavalue",theme:"ocean"},data:[{label:"Hibernate",value:response.data[0].Hibernate},{label:"Java",value:response.data[0].Java},{label:"J2EE",value:response.data[0].J2EE},{label:"Javascript",value:response.data[0].JavaSript}]}
      //this.data= response.data
      }).catch((err) => {console.log(err)})
      }
}

