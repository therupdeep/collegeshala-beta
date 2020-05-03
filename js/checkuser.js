
var url = '/about.html'

window.onload = function checklogin() {
    userAuth.authToken.then(token => console.log(token)).catch(err => console.error(err))
    document.getElementById("nav-user-icon").style.display = "none";
    let token = localStorage.getItem("idToken")
    if(token){
        document.getElementById("nav-sign-up").style.display = "none";
        document.getElementById("nav-user-icon").style.display = "block";
        if(localStorage.getItem("acc_type") == 'professor' ) {
            url = '/teacher-account.html'
        } else {
            url = '/my-account.html'
        }

    } else {
        document.getElementById("nav-user-icon").style.display = "none";
    }
}


function goToURL() {
    location.href = url;

}