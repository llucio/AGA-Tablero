import React from 'react';
import ReactDOM from 'react-dom';
import * as Survey from "survey-react";
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import "survey-react/survey.css";


/*
const EncuestaBrowser = ( encuesta ) => {
  return (
    <Row>
    	<Col xs={12} md={6} lg={4} className="">
	      <h1>Encuesta</h1>
	      <p className="lead">Contenido</p>

	      <div id="surveyContainer"></div>

	  	</Col>
	  </Row>
  );
};
*/


class EncuestaBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };
    Survey.StylesManager.applyTheme("bootstrap");
    //this.onCompleteComponent = this.onCompleteComponent.bind(this);
    //console.log( 'LOGS: ' + props );
  }
  //onCompleteComponent() {
  //  this.setState({ isCompleted: true });
  //}

  render() {
    var surveyJSON = {
			
    cookieName: "AGA-2",
		title: "Que tecnologia utilizas", pages: [
		  { name:"page1", questions: [ 
		      { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "frameworkUsing",title: "Do you use any front-end framework like Bootstrap?" },
		      { type: "checkbox", choices: ["Bootstrap","Foundation"], hasOther: true, isRequired: true, name: "framework", title: "What front-end framework do you use?", visibleIf: "{frameworkUsing} = 'Yes'" }
		   ]},
		  { name: "page2", questions: [
		    { type: "radiogroup", choices: ["Yes","No"],isRequired: true, name: "mvvmUsing", title: "Do you use any MVVM framework?" },
		    { type: "checkbox", choices: [ "AngularJS", "KnockoutJS", "React" ], hasOther: true, isRequired: true, name: "mvvm", title: "What MVVM framework do you use?", visibleIf: "{mvvmUsing} = 'Yes'" } ] },
		  { name: "page3",questions: [
		    { type: "comment", name: "about", title: "Please tell us about your main requirements for Survey library" } ] }
		 ]
			
    };

    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        json={surveyJSON}
        //showCompletedPage={false}
        onComplete={sendDataToServer}
        //onComplete={this.onCompleteComponent}
      />

    ) : null;

    //var onCompleteComponent = this.state.isCompleted ? (
    //  <div>Formulario guardado</div>
    //) : null;

    return (
      <div>
        {surveyRender}
      </div>
    );

  }
}


function sendDataToServer(survey) {
  var resultAsString = JSON.stringify(survey.data);
  var encodeDataJson = btoa(resultAsString);
  //alert(resultAsString); //send Ajax request to your web server.
  console.log( resultAsString );
  console.log( encodeDataJson );
}


function App() {
  return (
    <div className="App">
      <h1>SurveyJS</h1>
      <EncuestaBrowser />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


export default EncuestaBrowser;
