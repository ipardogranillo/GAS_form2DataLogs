/**Sets global variables for the project.
 * Must be run as part of initial setup. If any of these values may change,
 * it must be run again. I suggest doing this directly in by running this project's funcion
 * directly from Apps Script browser's IDE
*/
function setEnvVars( ) {
  Logger.log( 'setting environment variables as script properties...' );
  let envVariables = {

    // TODO: add global variables 
    // TODO: declare the id of the Spreadsheet where to read/dump responses 
    // spreadSheetId: <project-id>,

    // TODO: declare URL of the space where to log responses.
    // A Google chat space should be previously created;
    // be sure to check if you want to use threaded responses or not.
    // Once created, go to chat options (click the chat name in the upper left) >
    // Manage webhooks > Add a webhook and then copy the webhook's URL
    // (This may not be available unless you have it enabled via Google Workspace
    // admin's console) substitue strings between '<>'
    // chatUrl: 'https://chat.googleapis.com/v1/spaces/<space_id>/messages?key=' + 
    // '<space_key>&token=<token>',
  };

  let scriptProperties = PropertiesService.getScriptProperties( );
  scriptProperties.setProperties( envVariables, true );
  for( p in envVariables ){
    Logger.log('%s:\t%s', p, envVariables[p]);
  }
}
