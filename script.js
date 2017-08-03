$(function() {
    function logout() {

        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', '/logout', false, 'fail', 'fail');

        xmlhttp.onload = function () {
            if (xmlhttp.status == 401) {
                alert("logout successful");
            } else if (xmlhttp.status == 500) {
                alert('server error')
            } else {
                alert("logout ok");
            }
        };

        xmlhttp.send();
    }

    function makeRequest(username, password) {
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', '/test', false, username, password);

        xmlhttp.onload = function () {
            if (xmlhttp.status == 401) {
                alert("login failed");
            } else if (xmlhttp.status == 500) {
                alert('server error')
            } else {
                alert("login ok");
            }
        };

        xmlhttp.send();
    }

    $("#request").on('click', function(e) {
        e.preventDefault();
        const useCredentials = $('#useCredentials').prop('checked');
        const username = $("#username").val();
        const password = $("#password").val();

        if (useCredentials && username && password) {
            makeRequest(username, password)
        } else {
            makeRequest();
        }
    });

    $("#logout").on('click', function(e) {
        e.preventDefault();
        logout();
    });
});
