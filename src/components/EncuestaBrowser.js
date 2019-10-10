import React from 'react';
import ReactDOM from 'react-dom';
import * as Survey from "survey-react";
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import "survey-react/survey.css";


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

    //Survey.StylesManager.applyTheme("default");

    //$.material.init();

    Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-lg red darken-4";
    Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-lg btn-success";
    Survey.defaultBootstrapMaterialCss.matrixdynamic.button = "red";
    Survey.defaultBootstrapMaterialCss.matrixdynamic.buttonRemove = "red darken-4";
    Survey.StylesManager.applyTheme("bootstrapmaterial");


    //this.onCompleteComponent = this.onCompleteComponent.bind(this);
    //console.log( 'LOGS: ' + props );
  }
  //onCompleteComponent() {
  //  this.setState({ isCompleted: true });
  //}

  render() {
    var surveyJSON = {
			
    cookieName: "AGA-3",
		title: "Que tecnologia utilizas",
    "pages": [
      {
       "name": "page1",
       "elements": [
        {
         "type": "dropdown",
         "name": "question1",
         "choices": [
          "item1",
          "item2",
          "item3"
         ]
        },
        {
         "type": "imagepicker",
         "name": "question17",
         "choices": [
          {
           "value": "lion",
           "imageLink": "https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg"
          },
          {
           "value": "giraffe",
           "imageLink": "https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg"
          },
          {
           "value": "panda",
           "imageLink": "https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg"
          },
          {
           "value": "camel",
           "imageLink": "https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg"
          }
         ]
        },
        {
         "type": "expression",
         "name": "question18",
         "commentText": "Other (describe)"
        },
        {
         "type": "expression",
         "name": "question19",
         "commentText": "Other (describe)"
        },
        {
         "type": "rating",
         "name": "question3"
        },
        {
         "type": "comment",
         "name": "question4"
        },
        {
         "type": "dropdown",
         "name": "question5",
         "choices": [
          "item1",
          "item2",
          "item3"
         ]
        },
        {
         "type": "dropdown",
         "name": "question10",
         "choices": [
          "item1",
          "item2",
          "item3"
         ]
        },
        {
         "type": "comment",
         "name": "question11"
        },
        {
         "type": "multipletext",
         "name": "question12",
         "items": [
          {
           "name": "text1"
          },
          {
           "name": "text2"
          }
         ]
        },
        {
         "type": "matrix",
         "name": "question13",
         "columns": [
          "Column 1",
          "Column 2",
          "Column 3"
         ],
         "rows": [
          "Row 1",
          "Row 2"
         ]
        },
        {
         "type": "matrixdropdown",
         "name": "question14",
         "columns": [
          {
           "name": "Column 1"
          },
          {
           "name": "Column 2"
          },
          {
           "name": "Column 3"
          }
         ],
         "choices": [
          1,
          2,
          3,
          4,
          5
         ],
         "rows": [
          "Row 1",
          "Row 2"
         ]
        },
        {
         "type": "boolean",
         "name": "question25"
        },
        {
         "type": "expression",
         "name": "question26",
         "commentText": "Other (describe)"
        },
        {
         "type": "expression",
         "name": "question27",
         "commentText": "Other (describe)"
        },
        {
         "type": "matrix",
         "name": "question28",
         "columns": [
          "Column 1",
          "Column 2",
          "Column 3"
         ],
         "rows": [
          "Row 1",
          "Row 2"
         ]
        },
        {
         "type": "radiogroup",
         "name": "question24",
         "choices": [
          "item1",
          "item2",
          "item3"
         ]
        },
        {
         "type": "matrixdynamic",
         "name": "question15",
         "columns": [
          {
           "name": "Column 1"
          },
          {
           "name": "Column 2"
          },
          {
           "name": "Column 3"
          }
         ],
         "choices": [
          1,
          2,
          3,
          4,
          5
         ]
        },
        {
         "type": "multipletext",
         "name": "question16",
         "items": [
          {
           "name": "text1"
          },
          {
           "name": "text2"
          }
         ]
        },
        {
         "type": "comment",
         "name": "question6"
        },
        {
         "type": "dropdown",
         "name": "question7",
         "choices": [
          "item1",
          "item2",
          "item3"
         ]
        },
        {
         "type": "radiogroup",
         "name": "question8",
         "choices": [
          "item1",
          "item2",
          "item3"
         ]
        },
        {
         "type": "expression",
         "name": "question9",
         "commentText": "Other (describe)"
        },
        {
         "type": "rating",
         "name": "question2",
         "rateValues": [
          2,
          3,
          4,
          5
         ]
        },
        {
         "type": "html",
         "name": "question22"
        },
        {
         "type": "radiogroup",
         "name": "question20",
         "choices": [
          "item1",
          "item2",
          "item3"
         ]
        },
        {
         "type": "comment",
         "name": "question21"
        },
        {
         "type": "dropdown",
         "name": "question23",
         "choices": [
          "item1",
          "item2",
          "item3"
         ]
        }
       ]
      }
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
