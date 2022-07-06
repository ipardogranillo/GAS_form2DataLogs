// This project is made to take a Form's r submission,
// and manage the r's data for OneSync to use as a source.

/**Function to be triggered each time there's a submission
 * to the Form this project is embedded in.
*/
function onSubmit() {
  // get Form's last response data
  var response = new Response( FormApp.getActiveForm() );
  var spreadsheet = new Spreadsheet();
  try {
    spreadsheet.extractResponses ( response );
    // only true if extractions, transformations
    // and metadata adding successful
    response.success = true;
  }
  finally {
    // Spreadsheet response collector  log
    spreadsheet.dumpResponse( response );

    // Google Chat log
    // (this may not be available unless enabled via
    // Google Workspace admin's console)

    // TODO: uncomment if Google Chat webhooks enabled
    // and global variables are set properly
    // new Chatter( response );
    
  }
}