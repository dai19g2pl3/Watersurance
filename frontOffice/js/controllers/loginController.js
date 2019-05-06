$(document).ready(function () {
    validatorLogin();

    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        validatorLogin();
    })
});

function login() {
    var data = {};
    data.email = document.getElementById('loginEmail').value;
    data.password = document.getElementById('loginPwd').value;

    fetch('https://watersurance-api.herokuapp.com/api/auth/signin', {
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
            location.replace('http://localhost:3000/#/base/tables');
            return json;
        })
    ).catch((err) => {
        alert(err);
    });
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
