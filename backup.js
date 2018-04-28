function hi() {
  alert("hihihi");
}

function vote() {
  presidentName = document.querySelector('input[name="president"]:checked').value;
  vicePresidentName = document.querySelector('input[name="vicepresident"]:checked').value;

  confirmed = confirm("Confirm your votes\nPresident: " + presidentName + "\nVice President: " + vicePresidentName);
  if(confirmed) {
    var xhr = new XMLHttpRequest();
    alert('yoq');
    xhr.open("POST", "http://192.168.43.225:5000/api/vote", true);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() { //Call a function when the state changes.
      if(xhr.readyState == XMLHttpRequest.DONE) {
        if(xhr.status == 200) {
          alert("Your vote has been recorded.");
          // window.close();
        }
        else if(xhr.status == 201) {
          alert("You have already voted.");
          alert("We are kicking you out. Run.");
          // window.close();
        }
        else if(xhr.status == 403) {
          alert("You fucked with the cookie.\nWe will fuck with you.");
          alert("Run mudafuka.");
          alert("Go away.");
          // window.close();
        }
        else {
          alert("Chuda");
        }
      }
    }
    xhr.send("president=" + presidentName + "&vicepresident=" + vicePresidentName);
    // return true;
  }

  else {
    // event.preventDefault();
  }


});
