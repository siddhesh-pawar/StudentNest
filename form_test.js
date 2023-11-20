const { JSDOM } = require('jsdom');
const assert = require('chai').assert;
const mockAlert = require('./mockalert.js');

// Setting up the JSDOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  runScripts: 'dangerously',
  resources: 'usable',
});
const { window } = dom;
global.window = window;
global.document = window.document;

const { validateForm } = require('./form.js');

describe('validateForm', function () {
  let form;

  beforeEach(function () {
    
    form = document.createElement('form');
    form.id = 'testForm';
    document.body.appendChild(form);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    form.appendChild(nameInput);

    const emailInput = document.createElement('input');
    emailInput.type = 'text';
    emailInput.id = 'email';
    form.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    form.appendChild(passwordInput);

    const repasswordInput = document.createElement('input');
    repasswordInput.type = 'password';
    repasswordInput.id = 'repassword';
    form.appendChild(repasswordInput);
  });

  afterEach(function () {
    document.body.removeChild(form);
  });

  it('should return true for valid input', function () {
    form.querySelector('#name').value = 'sid';
    form.querySelector('#email').value = 'sid@test.com';
    form.querySelector('#password').value = 'password123';
    form.querySelector('#repassword').value = 'password123';


    const result = validateForm();

    assert.isTrue(result);

   
  });

  it('should return false when any field is empty', function () {

    const originalAlert = global.alert;
    global.alert = mockAlert;

    form.querySelector('#name').value = 'John';
    form.querySelector('#email').value = '';
    form.querySelector('#password').value = 'password123';
    form.querySelector('#repassword').value = 'password123';

    

    const result = validateForm();

    assert.isFalse(result);

    assert.strictEqual(mockAlert.messages[0], 'All fields are required');
    // Restore the original alert function
    global.alert = originalAlert;


  });

  it('should return false when passwords do not match', function () {

    
  mockAlert.messages.length = 0;

    
    const originalAlert = global.alert;
    global.alert = mockAlert;

    form.querySelector('#name').value = 'John';
    form.querySelector('#email').value = 'john@example.com';
    form.querySelector('#password').value = 'password123';
    form.querySelector('#repassword').value = 'password456';

    const result = validateForm();

    assert.isFalse(result);

    assert.strictEqual(mockAlert.messages[0], 'Passwords do not match');
    // Restore the original alert function
    global.alert = originalAlert;

  });
});