$(document).ready(function () {

    const value = doesHttpOnlyCookieExist('token');
    
    if(doesHttpOnlyCookieExist('token')) {
        replaceWithLogout();
    } 

    $('#logoutNav').on('click', function (e) {
        e.preventDefault();
        logout();
    })
});

function doesHttpOnlyCookieExist(cookiename) {
    const d = new Date();
    d.setTime(d.getTime() + (1000));
    const expires = "expires=" + d.toUTCString();

    document.cookie = cookiename + "=new_value; path=/;" + expires;
    if (document.cookie.indexOf(cookiename + '=') == -1) {
        return true;
    } else {
        return false;
    }
}

function logout() {
    fetch('https://watersurance-api.herokuapp.com/api/auth/logout', {
        method: 'GET',
        credentials: 'include'
    }).then(response =>
        response.json().then(json => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            location.reload();
            return json;
        })
    )
}

function replaceWithLogout() {
        const loginNav = document.getElementById('loginNav');
        loginNav.remove();

        const logLi = document.getElementById('logLi');
        const a = document.createElement("a");
        a.href = '';
        a.id = 'logoutNav';
        a.text = 'Logout'
        logLi.appendChild(a);       
}