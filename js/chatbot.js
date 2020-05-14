let token = window.localStorage.getItem("idToken");

if (token) {
    let details_url;
    if (localStorage.getItem("acc_type") == "professor") {
        details_url = "https://api.collegeshala.com/professordetails";
    } else {
        details_url = "https://api.collegeshala.com/studentdetails";
    }

    $.ajax({
        method: "POST",
        url: details_url,
        headers: {
            authorization: token,
        },
        body: {},
        contentType: "application/json",
        success: async function complete(result) {
            function getHash(email) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        method: "POST",
                        url: "https://api.collegeshala.com/get-hash",
                        data: JSON.stringify({
                            email: email,
                        }),
                        contentType: "application/json",
                        success: function complete(result) {
                            // console.log(result);
                            resolve(result);
                        },
                        error: function error(err) {
                            console.error(err);
                            reject(err);
                        },
                    });
                });
            }

            const { email, fullName } = result.Item;
            const hash = (await getHash(email)).hash;
            console.log("Full Name: ", fullName);
            console.log("Email: ", email);
            console.log("Hash Value: ", hash);
            Tawk_API.onLoad = function () {
                Tawk_API.setAttributes(
                    {
                        name: fullName,
                        email: email,
                        hash: hash,
                    },
                    function (error) {
                        console.error(error);
                    }
                );
            };
        },
        error: function error(err) {
            console.error(err);
        },
    });
}

/*Start of Tawk.to Script*/
var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
    Tawk_API.visitor = {
        name  : 'Name',
        email : 'email@gmail.com'
    };
(function () {
    var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/5ebc19b6967ae56c52197873/default";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
})();
/*End of Tawk.to Script*/
