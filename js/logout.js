
var url = '/index.html'


function goToURL() {

    localStorage.removeItem("idToken");
    localStorage.removeItem("acc_type");
    location.href = url;

}