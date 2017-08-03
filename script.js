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
        });

        return false;
    }

    function makeRequest() {
        function makeBasicAuth(user, pass) {
            const tok = user + ':' + pass;
            const hash = Base64.encode(tok);
            return "Basic " + hash;
        }

        $.ajax({
            type: 'GET',
            url: '/test',
            beforeSend : function(req) {
                const user = $("#username").val();
                const pass = $("#password").val();

                if ($('#useCredentials').prop('checked') && user && pass) {
                    console.log('using form credentials...');
                    const auth = makeBasicAuth(user, pass);
                    req.setRequestHeader('Authorization', auth);
                }
            }
        })
        .done(function() {
            alert("login ok")
        })
        .fail(function(){
            alert('login failed')
        });

        return false;
    }

    $("#request").on('click', makeRequest);
    $("#logout").on('click', logout);
});
