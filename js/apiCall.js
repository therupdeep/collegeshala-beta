async function getdata(apiUrl, data) {
    let token = window.localStorage.getItem("idToken");
    if (!token) {
        console.log("User not signed in!");
    } else {
        $.ajax({
            method: 'POST',
            url: apiUrl,
            headers: {
                authorization: token
            },
            data: JSON.stringify({        //not needed here
                data: data,
            }),
            contentType: 'application/json',
            success: function complete(result){
                // console.log(result);
                return result;
            },
            error: function error(err) {
                console.error(err);
            }
        });
    }
}

// https://pfbhdk5lh6.execute-api.ap-south-1.amazonaws.com/production/getnotes