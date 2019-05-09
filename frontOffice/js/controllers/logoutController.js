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
};