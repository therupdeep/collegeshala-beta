/*Start of Tawk.to Script*/

var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/5ebc19b6967ae56c52197873/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
/*End of Tawk.to Script*/

let token = window.localStorage.getItem("idToken");

if (token) {
    if (localStorage.getItem("acc_type") == 'professor') {
        $.ajax({
            method: 'POST',
            url: "https://api.collegeshala.com/professordetails",
            headers: {
                authorization: token
            },
            body: {},
            contentType: 'application/json',
            success: function complete(result) {
                //let phno;
                let fullname, emailadd;
                console.log(result.Item);
                //document.getElementById('email').value = result.Item.email;

                var keys = Object.keys(result.Item);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if ("fullName" == key) {
                        for (let [k, value] of Object.entries(result.Item)) {
                            //console.log(`${key}: ${value}`);
                            if ("fullName" == k) {
                                let fullname = `${value}`;
                                break;
                            }
                        }
                    }else if ("email" == key) {
                        for (let [k, value] of Object.entries(result.Item)) {
                            //console.log(`${key}: ${value}`);
                            if ("email" == k) {
                                let emailadd = `${value}`;
                                //console.log(em)
                                document.getElementById('email').value = em;
                                break;
                            }
                        }
                    }
                }
                console.log(fullname);
                console.log(emailadd);
                Tawk_API = Tawk_API || {};
                Tawk_API.visitor = {
                    name: fullname,
                    email: emailadd
                };
            },
            error: function error(err) {
                console.error(err);
            }
        });
    } else {
        $.ajax({
            method: 'POST',
            url: "https://api.collegeshala.com/studentdetails",
            headers: {
                authorization: token
            },
            body: {},
            contentType: 'application/json',
            success: function complete(result) {
                let fullname, emailadd;
                //let phno;
                //console.log(result.Item);
                var keys = Object.keys(result.Item);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if ("fullName" == key) {
                        for (let [k, value] of Object.entries(result.Item)) {
                            //console.log(`${key}: ${value}`);
                            if ("fullName" == k) {
                                fullname = `${value}`;
                                //console.log(fullname);
                                //document.getElementById('fullname').value = full;
                                break;
                            }
                        }
                    } else if ("email" == key) {
                        for (let [k, value] of Object.entries(result.Item)) {
                            //console.log(`${key}: ${value}`);
                            if ("email" == k) {
                                emailadd = `${value}`;
                                //console.log(emailadd);
                                //document.getElementById('email').value = em;
                                break;
                            }
                        }
                    }
                }
                console.log(fullname);
                console.log(emailadd);
                Tawk_API = Tawk_API || {};
                Tawk_API.visitor = {
                    name: fullname,
                    email: emailadd
                };
            },
            error: function error(err) {
                console.error(err);
            }
        });
    }
}