// Class that posts log messages in a given chat room
// the chat space id is defined as an environment
// variable in env.gs 
class Chatter {
  /**
   * class constructor
   * @param {Response} r response to chat about
   */
  constructor( r ) {
    Logger.log( r );
    this.url = PropertiesService.getScriptProperties().getProperty( 'chatUrl' )

    // TODO: if you've enabled threads in your Google Chat space
    // you could  add "&thread_key=<custom thread id> to the url
    // in order to log the responses (or other data) in distinct threads;
    // you can do so from a switch to differentiate threads according
    // the response, metadata or any transformation made

    this.payload = this.getPayload( r );
    if( this.payload ) this.sendChatMessage()


  }
  getPayload( r ) {

    // TODO: define your custom message for the Google Chat log
    let message = "NEW RESPONSE\n";
    for (let p in r) {
      message += p + ":\t" + r[p] + '\n';
    }
    
    return {
      text: message
    }
  }
  sendChatMessage() {
    UrlFetchApp.fetch(
      this.url,
      {
        'method' : 'post',
        'contentType': 'application/json',
        'payload' : JSON.stringify(this.payload)
      }
    );
  }
}