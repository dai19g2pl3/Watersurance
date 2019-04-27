$(document).ready(function () {
    validatorSignUp();

    $('#btnSignUpCancel').click(function(){
        $('#signUpModal').modal('toggle');
    });
    
    $('#signUpForm').on('submit', function (e) {
        e.preventDefault();
        validatorSignUp();
    })
});

function signUp() {
    var data = {};
    data.name = document.getElementById('signUpName').value;
    data.email = document.getElementById('signUpEmail').value;
    data.password = document.getElementById('signUpPwd').value;
    data.nif = document.getElementById('signUpNif').value;
    data.phoneNumber = document.getElementById('signUpPhoneNumber').value;

    fetch('http://localhost:8080/api/auth/signup', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(data)
    }).then(response =>
        response.json().then(json => {
            if (!response.ok) {
                if (response.status === 409) {
                    alert("Duplicated Email");
                }
                return Promise.reject(json);
            }
            document.getElementById("signUpForm").reset();
            console.log("submitted with success");
            return json;
        })
    )
}

function validatorSignUp() {
    let validator = new Validator(document.querySelector('form[name="signUpForm"]'), function (err, res) {
        if (res) {
            signUp();
        }
    }, {
            rules: {
                customMinLength: function (value, params) {
                    return this.min(value.replace(/\s{2,}/g, ' ').length, params);
                },
                nif: function (value, params) {
                    return this.between(value.replace(/\s{2,}/g, ' ').length, params);
                }
            },
            messages: {
                en: {
                    customMinLength: {
                        empty: 'Insira a sua palavra-passe',
                        incorrect: 'Introdoziu menos de {0} carateres'
                    },
                    nif: {
                        empty: 'Insira o seu nif',
                        incorrect: 'Nif inválido'
                    }
                }

            }
        });

}
