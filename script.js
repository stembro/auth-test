$(function() {
    function logout() {
        $.ajax({
            type: 'GET',
            url: '/logout',
            headers: { "Authorization": "Basic xxx" }
        })
        .done(function() {
            alert( "logout failed" );
        })
        .fail(function(){
            alert('log out successful')
            window.location.reload(true);
        });;
    }

    function makeBasicAuth(user, pass) {
        const tok = user + ':' + pass;
        const hash = Base64.encode(tok);
        return "Basic " + hash;
    }

    function makeRequest(username, password) {
        const xmlhttp = new XMLHttpRequest();

        xmlhttp.open('GET', '/test', false);

        xmlhttp.onload = function () {
            if (xmlhttp.status == 401) {
                alert("login failed");
            } else {
                alert("login ok");
            }
        };

        if (username && password) {
            xmlhttp.setRequestHeader('Authorization', makeBasicAuth(username, password));
        }

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
