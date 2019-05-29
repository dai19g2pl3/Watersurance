$(document).ready(function () {

    setInterval(() => {
        if(getCookie('token') != null) {
            replaceWithLogout();
        } 
    }, 1000 );

    if(getCookie('token') != null) {
        replaceWithLogout();
    }

    $('#logoutNav').on('click', function (e) {
        e.preventDefault();
        logout();
    })
    
});

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function logout() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    replaceWithLogin();
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

function replaceWithLogin() {
    const loginNav = document.getElementById('logoutNav');
    loginNav.remove();

    const logLi = document.getElementById('logLi');
    const a = document.createElement("a");
    a.href = '';
    a.dataset.toggle = 'modal';
    a.dataset.target = '#loginModal';
    a.id = 'loginNav';
    a.text = 'Login'
    logLi.appendChild(a); 
    
}
/* Server cookie
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

/* Local Storage
$(document).ready(function () {
    if(localStorage.getItem('token') !== null) {
        replaceWithLogout();
    }
    
    $('#logoutNav').on('click', function (e) {
        e.preventDefault();
        logout();
    })
});

function logout() {
    if(isLoggedIn) {
        localStorage.clear();
        replaceWithLogin();
    } else console.log("You're not logged in"); 
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

function replaceWithLogin() {
    const loginNav = document.getElementById('logoutNav');
    loginNav.remove();

    const logLi = document.getElementById('logLi');
    const a = document.createElement("a");
    a.href = '';
    a.dataset.toggle = 'modal';
    a.dataset.target = '#loginModal';
    a.id = 'loginNav';
    a.text = 'Login'
    logLi.appendChild(a);   
}

const isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};*/