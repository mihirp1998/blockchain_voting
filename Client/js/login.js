var e = document.forms['login'];
e.addEventListener("submit", function(event) {
  var input = $('.validate-input .input100');
  if(!input[0].validity.valid || !input[1].validity.valid) {
    event.preventDefault();
  }
});

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
<<<<<<< HEAD
      xhr.open("POST", "http://10.30.26.212:5000/api/login", true);
=======
      xhr.open("POST", "http://192.168.43.225:5000/api/login", true);
>>>>>>> aa72ad17b44581a3c236268a3a22fdd0f01e14ff
      xhr.withCredentials = true;
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() { //Call a function when the state changes.
        if(xhr.readyState == XMLHttpRequest.DONE) {
          if(xhr.status == 200) {
            document.write(xhr.responseText);
            alert(document.cookie);
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
      // event.preventDefault();
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
