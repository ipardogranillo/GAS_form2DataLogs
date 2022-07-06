/** 
 * Gets the the last response of the Form
 * this GAS project is embedded in.
*/
class Response {
  /**
   * class constructor
   * @param {Form} form container of this triggered project
  */
  constructor(form) {
    // form's last response data
    Logger.log( 'reading last form response' );
    let formResponses = form.getResponses();
    let lastResponse = formResponses[ formResponses.length - 1 ];
    let itemResponses = lastResponse.getItemResponses();
    // form response data
    this.formId = form.getId();
    this.id = lastResponse.getId();
    this.timestamp = lastResponse.getTimestamp();
    this.respondentEmail = lastResponse.getRespondentEmail();

    // TODO: add as item responses and metadata as needed
    // remember to declare null values for any other attributes
    // to be obtained (e. g. transformations or metadata)
    
    // example item response (one for each question) and metadata 
    this.itemResponse = itemResponses[0].getResponse();
    this.metadata = 'Form embedded GAS project';
    
    // initialized as false for status logging
    this.success = false
  }
}
