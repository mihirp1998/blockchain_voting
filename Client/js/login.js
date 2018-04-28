var buf = new Uint8Array(1);
window.crypto.getRandomValues(buf);
alert(buf[0]);

function sendPost(){
    var input = $('.validate-input .input100');
    var valid = true;
    for(var i=0; i<input.length; i++) {
        if(validate(input[i]) == false){
            showValidate(input[i]);
            valid=false;
        }
    };

    if(valid) {
      // alert('yoq');
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5000/api/login", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() { //Call a function when the state changes.
        if(xhr.readyState == XMLHttpRequest.DONE) {
          if(xhr.status == 200) {
            // alert(document.cookie);
            document.write(xhr.responseText);
          }
          else if(xhr.status == 201) {
            var elem = document.getElementById("errorMsg");
            elem.innerHTML = xhr.responseText;
            // elem.style.color='blue';
            elem.style.display = 'inline';
          }
        }
      }
      xhr.send("id=" + $(input[0]).val()+ "&password=" + $(input[1]).val());
      // alert("id=" + $(input[0]).val()+ "&password=" + $(input[1]).val());
    }

    else {
      event.preventDefault();
    }

};

function validate (input) {
    if($(input).attr('type') == 'id' || $(input).attr('name') == 'id') {
        if($(input).val().trim().match(/^(f201[0-9]{5})$/) == null) {
            return false;
        }
    }
    else {
        if($(input).val().trim() == ''){
            return false;
        }
    }
};

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
};

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
};
