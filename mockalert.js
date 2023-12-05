function mockAlert(message) {
    // Instead of displaying an actual alert, store the message in a variable
    mockAlert.messages.push(message);
  }
  
  mockAlert.messages = [];
  
  module.exports = mockAlert;
  