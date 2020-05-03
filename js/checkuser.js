
<<<<<<< HEAD
var url = ''

window.onload = function checklogin() {
=======
var url = '/about.html'

window.onload = async function checklogin() {

>>>>>>> e0d6f5283204187291dbc5071e7a54a5477f177c
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