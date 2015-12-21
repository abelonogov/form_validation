var validateLogin = function (input) {
  if (input.value.length >= 3 && input.value.length <= 16) {
    addSuccessSpan(input);
  } else {
    addErrorSpan(input, 'Login length should be more than 3 and less than 16 symbols');
  }
}
var validateEmail = function (input) {
  if (/^[a-z0-9\._\+-]+@([a-z0-9\._\+-]+\.)+[a-z0-9\._\+-]+$/i.test(input.value)) {
    addSuccessSpan(input);
  } else {
    addErrorSpan(input, 'Please provide correct email address');
  }
}
var validatePassword = function () {
  var passwordFields = document.querySelectorAll('input[type="password"]');
  if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(passwordFields[0].value)) {
    addSuccessSpan(passwordFields[0]);
    if (passwordFields[0].value == passwordFields[1].value) {
      addSuccessSpan(passwordFields[1]);
    } else {
      addErrorSpan(passwordFields[1], 'Password confirmation should mutch password');
    }
  } else {
    addErrorSpan(passwordFields[0], 'Password should contains at least one number, one lowercase and one uppercase letter at least eight characters');
  }
}
var validatePhone = function(input) {
  if (/^[\d][\(\)\w+\-.]{10,}$/.test(input.value)) {
    addSuccessSpan(input);
  } else {
    addErrorSpan(input, 'Phone number should contains digits numbers');
  }
}
var addErrorSpan = function (input, message) {
  input.className = 'invalid';
  if(input.nextSibling) {
    input.nextSibling.className = 'error';
    input.nextSibling.setAttribute("data-after", message);
  } else {
    var span = document.createElement('span');
    span.className = 'error';
    span.setAttribute("data-after", message);
    input.parentNode.insertBefore(span, input.nextSibling);
  }
  shouldEnableSubmit();
}
var addSuccessSpan = function (input) {
  input.className = 'valid';
  if(input.nextSibling) {
    input.nextSibling.className = 'ok';
    input.nextSibling.innerHtml = '';
  } else {
    var span = document.createElement('span');
    span.className = 'ok';
    input.parentNode.insertBefore(span, input.nextSibling);
  }
  shouldEnableSubmit();
}
var validateForm = function () {
  var fields = document.querySelectorAll('input:not([type="submit"])');
  [].forEach.call(fields, function (field) {
    field.addEventListener('keyup', function () {
      if (this.type == 'text') {
        validateLogin(this);
      } else if (this.type == 'password') {
        validatePassword();
      } else if (this.type == 'tel') {
        validatePhone(this);
      } else {
        validateEmail(this);
      }
    });
  });
}
var shouldEnableSubmit = function (fields) {
  var submitButton = document.querySelector('input[type="submit"]');
  if(document.getElementsByClassName('valid').length == 5) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}
window.onload = validateForm;