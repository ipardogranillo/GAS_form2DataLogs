/**
 * handles all processes related to the SpreadsheetApp
 * and its related classes, namely writing the
 * transformed data from a form's response to
 * write it in a spreadsheet; the spreadsheet's id
 * is defined as an environmental variable, declared
 * as a global property for this project
 * 
 * sheets' names and order of the columns are
 * hard-coded (when dumping to spreadsheet)
 */
 class Spreadsheet {
  /**
   * class constructor
   */
  constructor () {
    Logger.log( 'setting ss' );
    let ss = SpreadsheetApp.openById(
      PropertiesService
        .getScriptProperties()
        .getProperty( 'spreadSheetId' )
    );

    // TODO: add as many sheets as needed to read and/or 
    // write into, as well as change the name of said sheets
    this.responseSheet = ss.getSheetByName( 'Sheet1' );

    // TODO: declare needed matrixes from sheets to be
    // extracted for metadata or transformations

  }
  // If needed, more methods like this one can be created
  // in order to read data from other Sheets
  extractResponses( r ) {
    Logger.log('loading previous responses');
    // Load responses sheet
    // 
    this.loadedResponses = this.responseSheet
      .getDataRange()
      .getValues();
      // Headers assumed on first row and removed 
      Logger.log( 'headers: ' + this.loadedResponses.splice( 0, 1 ) );
      
      // TODO: Add any metadata or metrics dependent on
      // previous responses or other data from other
      // sheets that had been declared, as well as the calculations
      // to obtain them. Loaded previous response are to be dealt
      // in a matrix containing arrays that represent all rows in the
      // spreadsheet, starting from row 2 (headers removed) until the
      // last row with content (the spreadsheet's "data range")

  }
  /**
   * dumps form response in submissions sheet
   * @param {Response} r response to dump
  */
  dumpResponse( r ) {
    Logger.log( 'dumping new response' );
    // hard-coded according to order in spreadsheet headers
    let responseToDump = [
      r.id,
      r.formId,
      r.timestamp,
      r.respondentEmail,
      r.itemResponse,
      r.metadata,
      r.success
    ];
    this.responseSheet
      .getRange(
        this.responseSheet.getLastRow() + 1,
        1,
        1,
        responseToDump.length
      )
      .setValues( [ responseToDump ] );
  }
}