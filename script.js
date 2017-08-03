$(function() {
    function logout() {
        $.ajax({
            type: "GET",
            url: "/test",
            username: "logout",
            password: "logout",
            headers: { "Authorization": "Basic xxx" }
        })
        .fail(function(){
            alert('log out successful')
            window.location.reload(true);
        });
    }

    function makeRequest() {
        function makeBasicAuth(user, pass) {
            const tok = user + ':' + pass;
            const hash = Base64.encode(tok);
            return "Basic " + hash;
        }

        $.ajax({
            url: '/test',
            success:function(){
                alert('success');
            },
            beforeSend : function(req) {
                const user = $("#username").val();
                const pass = $("#password").val();

                if ($('#useCredentials').prop('checked') && user && pass) {
                    console.log('using form credentials...');
                    const auth = makeBasicAuth(user, pass);
                    req.setRequestHeader('Authorization', auth);
                }
            }
        });
    }

    $("#request").on('click', makeRequest);
    $("#logout").on('click', logout);
});
