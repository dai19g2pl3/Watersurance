$(document).ready(function () {
    validatorLogin();

    $('#btnSignUpCancel').click(function(){
        $('#signUpModal').modal('toggle');
    });

    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        validatorLogin();
    })
});

function login() {
    var data = {};
    data.email = document.getElementById('email').value
    data.password = document.getElementById('pwd').value

    fetch('http://localhost:8080/api/auth/signin', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(data)
    }).then(response =>
        response.json().then(json => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            document.getElementById("loginForm").reset();
            console.log("submitted with success");
            return json;
        })
    )
}

function validatorLogin() {
    let validator = new Validator(document.querySelector('form[name="loginForm"]'), function(err, res) {
        if (res) {
            login();
        }
    }, {
            rules: {
                customMinLength: function (value, params) {
                        return this.min(value.replace(/\s{2,}/g, ' ').length, params);
                }
            },
            messages: {
                en: {
                    customMinLength: {
                            empty: 'Insira a sua password',
                            incorrect: 'Introdoziu menos de {0} carateres'
                        }
                }
                
            }
        });

}
