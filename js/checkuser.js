
var url = '/about.html'

window.onload = async function checklogin() {

    if(window.location.href.endsWith("all-product.html")) {
        console.log("in my all-product.html");
        getSearchResult();
    } else if(window.location.href.endsWith("my-earnings.html")) {
        console.log("in my-earnings.html");
        getEarnings();
    } else if(window.location.href.endsWith("my-uploads.html")) {
        console.log("in my-uploads.html");
        getUploads();
    } else if(window.location.pathname.endsWith("single-product.html")) {
        console.log("in single-product.html");
        getNote();
    } else if(window.location.href.endsWith("my-transaction.html")) {
        console.log("in my-transaction.html");
        getTransactions();
    }

    document.getElementById("nav-user-icon").style.display = "none";
    let token = localStorage.getItem("idToken")
    if (token) {
        document.getElementById("nav-sign-up").style.display = "none";
        document.getElementById("nav-user-icon").style.display = "block";
        if (localStorage.getItem("acc_type") == 'professor') {
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



function userindexredirect() {
    let urlIndex = '/register.html';
    let token = localStorage.getItem("idToken")
    console.log(token)
    if (token) {
        if (localStorage.getItem("acc_type") == 'professor') {
            urlIndex = '/teacher-account.html'
        } else {
            urlIndex = '/my-account.html'
        }
    }
    location.href = urlIndex;
}