$(document).ready(function () {
    validatorSignUp();

    $('#signUpForm').on('submit', function (e) {
        e.preventDefault();
        validatorSignUp();
    })
});

function validatorSignUp() {
    let validator = new Validator(document.querySelector('form[name="signUpForm"]'), function(err, res) {
        if (res) {
            login();
        }
    }, {
            rules: {
                customMinLength: function (value, params) {
                        return this.min(value.replace(/\s{2,}/g, ' ').length, params);
                },
                nif: function(value, params) {
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