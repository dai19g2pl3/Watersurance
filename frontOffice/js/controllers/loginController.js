$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        login();
    })
});
/*window.addEventListener("load", function() {
    document.getElementById('loginForm').addEventListener("submit", function(e) {
      e.preventDefault();
      login();
    })
  });
*/
function login() {
    var data = {};
    data.usernameOrEmail = document.getElementById('emailLogin').value
    data.password = document.getElementById('pwdLogin').value
    console.log(JSON.stringify(data));
    fetch('http://localhost:8080/api/auth/signin', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(data)
    }).then(response =>
        response.json().then(json => {
            if (!response.ok) {
                alert(arroz);
                return Promise.reject(json);
            }
            console.log("submitted with success");
            return json;
        })
    )
}
