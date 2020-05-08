let re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

$("#newsletter-btn").click(async function () {
    const email = $("#sub-email").val();
    // console.log(email.match(re)[0]);
    if (!email.match(re)) {
        alert("Please enter a valid email!");
    } else {
        $.ajax({
            method: "POST",
            url: "https://api.collegeshala.com/subscribenewsletter",
            data: JSON.stringify({
                email: email,
            }),
            headers: {},
            contentType: "application/json",
            success: function complete(result) {
                // console.log(result);
                alert(
                    "You have been subscribed successfully to our newsletter!"
                );
            },
            error: function error(err) {
                console.error(err);
                alert(
                    "Oops! Seems like there was an error! Please try again later :-/"
                );
            },
        });
    }
    $("#sub-email").val("");
});
