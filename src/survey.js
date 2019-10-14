import * as Survey from 'survey-react';

Survey.defaultBootstrapMaterialCss.navigationButton = "btn btn-lg red white-text";
//Survey.defaultBootstrapMaterialCss.rating.item = "btn btn-lg red white-text";
Survey.defaultBootstrapMaterialCss.matrixdynamic.button = "btn red white-text ";
Survey.defaultBootstrapMaterialCss.matrixdynamic.buttonRemove = "btn red white-text ";
Survey.StylesManager.applyTheme("bootstrapmaterial");
Survey.Survey.defaultLocale = "es-ES";

export default Survey;
