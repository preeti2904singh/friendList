    window.fbAsyncInit = function() {
        FB.init({ appId: '582750911896942', 
                    status: true, 
                    cookie: true, 
                    xfbml: true
                });
        FB.Event.subscribe('auth.statusChange', handleStatusChange); 
    };

    // Load the SDK Asynchronously
    (function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

    // Login with Scope Permissions
    function loginUser() {
        FB.login(function(response) { }, {scope:"email,user_friends"}); 
    }

    ///update user info after login
    function updateUserInfo(response) {
        FB.api('/me', function(response) {
            document.getElementById('user-info').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name;
        });
    }

    /// Callback when user authenticates
    function handleStatusChange(response) {
        document.body.className = response.authResponse ? 'connected' : 'not_connected';
        if (response.authResponse) {
            updateUserInfo(response);
        }
    }    

    function getUserFriends() {
        FB.api('me/taggable_friends', function (response) {
            var friends = response.data;
            for (var i = 0; i <= friends.length && i <= 25; i++) {
              var friend = friends[i];
              console.log(response.data);
              $("#user-friends").append('<img src="' + response.data[i].picture.data.url + '"/>' + friend.name + '<br>');
            }
        });
    }

$( document ).ready(function() {
    $('#login').bind('click', function(){
        $('.login_section').hide();
        $('.logout_section').show();
    });

    $('#logout').bind('click', function(){
        $('.logout_section').hide();
        $('.login_section').show();
        location.reload(true);
    });
})