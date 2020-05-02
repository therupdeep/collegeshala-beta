var userAuth = window.userAuth || {};

var signinUrl = "login.html";

var poolData = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId,
};

var userPool;

if (
    !(
        _config.cognito.userPoolId &&
        _config.cognito.userPoolClientId &&
        _config.cognito.region
    )
) {
    alert("Error loading data!");
}

userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

if (typeof AWSCognito !== "undefined") {
    AWSCognito.config.region = _config.cognito.region;
}

userAuth.signOut = function signOut() {
    userPool.getCurrentUser().signOut();
};

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const sessionExpire = (token) => {
    sessionExp = parseJwt(token).exp;
    curr = new Date().getTime();
    curr = curr / 1000;
    console.log(sessionExp, curr);
    if (curr > sessionExp) {
        return true;
    }
    return false;
};

userAuth.authToken = new Promise(function fetchCurrentAuthToken(
    resolve,
    reject
) {
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
        cognitoUser.getSession(function sessionCallback(err, session) {
            if (err) {
                reject(err);
            } else if (!session.isValid()) {
                resolve(null);
            }
            if (sessionExpire(session.getIdToken().getJwtToken())) {
                if (
                    window.location.pathname != "/register.html" &&
                    window.location.pathname != "/login.html" &&
                    window.location.pathname != "/studentRegister.html" &&
                    window.location.pathname != "/teacherRegister.html" &&
                    window.location.pathname != "/" &&
                    window.location.pathname != "/index.html"
                )
                    window.location.href = "/login.html";
            } else {
                resolve(session.getIdToken().getJwtToken());
            }
        });
    } else {
        resolve(null);
    }
});

function register(userData, onSuccess, onFailure) {
    var dataMail = {
        Name: "email",
        Value: userData.email,
    };
    var name = {
        Name: "name",
        Value: userData.name,
    };
    var phon = {
        Name: "phone_number",
        Value: userData.phone,
    };
    var cllgname = {
        Name: "custom:cllgname",
        Value: userData.cllgname,
    };
    var isProfessor = {
        Name: "custom:isProfessor",
        Value: userData.isProfessor,
    };
    var attributeMail = new AmazonCognitoIdentity.CognitoUserAttribute(
        dataMail
    );
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(name);
    var attributePhone = new AmazonCognitoIdentity.CognitoUserAttribute(phon);
    var attributecllg = new AmazonCognitoIdentity.CognitoUserAttribute(
        cllgname
    );
    var attributeisProf = new AmazonCognitoIdentity.CognitoUserAttribute(
        isProfessor
    );
    if (userData.isProfessor === "false") {
        var univname = {
            Name: "custom:univname",
            Value: userData.univname,
        };
        var degree = {
            Name: "custom:degree",
            Value: userData.degree,
        };
        var sem = {
            Name: "custom:sem",
            Value: userData.sem,
        };
        var attributeuniv = new AmazonCognitoIdentity.CognitoUserAttribute(
            univname
        );
        var attributedeg = new AmazonCognitoIdentity.CognitoUserAttribute(
            degree
        );
        var attributesem = new AmazonCognitoIdentity.CognitoUserAttribute(sem);
        userPool.signUp(
            userData.email,
            userData.password,
            [
                attributePhone,
                attributeName,
                attributecllg,
                attributeisProf,
                attributeMail,
                attributeuniv,
                attributedeg,
                attributesem,
            ],
            null,
            function signUpCallback(err, result) {
                if (!err) {
                    onSuccess(result);
                } else {
                    onFailure(err);
                }
            }
        );
    } else {
        var subjects = {
            Name: "custom:subjects",
            Value: userData.subject,
        };
        var dept = {
            Name: "custom:department",
            Value: userData.department,
        };
        var attributesub = new AmazonCognitoIdentity.CognitoUserAttribute(
            subjects
        );
        var attributedept = new AmazonCognitoIdentity.CognitoUserAttribute(
            dept
        );
        userPool.signUp(
            userData.email,
            userData.password,
            [
                attributePhone,
                attributeName,
                attributecllg,
                attributeisProf,
                attributeMail,
                attributesub,
                attributedept,
            ],
            null,
            function signUpCallback(err, result) {
                if (!err) {
                    onSuccess(result);
                } else {
                    onFailure(err);
                }
            }
        );
    }
    console.log(userData.phone, typeof userData.phone);
}

function verify(phone, code, onSuccess, onFailure) {
    createCognitoUser(phone).confirmRegistration(
        code,
        true,
        function confirmCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        }
    );
}

function logIn(userData, onSuccess, onFailure) {
    const email = userData.email;
    const password = userData.password;
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        {
            Username: email,
            Password: password,
        }
    );
    console.log(authenticationDetails);
    var cognitoUser = createCognitoUser(email);
    console.log("cognitouser", cognitoUser);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: onSuccess,
        onFailure: onFailure,
    });
}

function createCognitoUser(phone) {
    return new AmazonCognitoIdentity.CognitoUser({
        Username: phone,
        Pool: userPool,
    });
}

function forgotPassword(email) {
    createCognitoUser(email).forgotPassword({
        onSuccess: (result) => {
            console.log(result);
            next();
        },
        onFailure: (err) => {
            alert(err);
            console.log(err);
        },
    });
}
function resetPassword(code, email, password) {
    createCognitoUser(email).confirmPassword(code, password, {
        onSuccess: (result) => {
            console.log(result);
            alert("Password updated Successfully");
            window.location.href = "/login.html";
        },
        onFailure: (err) => {
            alert(err);
            console.log(err);
        },
    });
}

function handleVerify() {
    var email = $("input[name='email']").val();
    var code = $("input[name='otp']").val();
    verify(
        email,
        code,
        function verifySuccess(result) {
            console.log("call result: " + result);
            console.log("Successfully verified");
            verifych = true;
            next();
        },
        function verifyError(err) {
            console.log(err, err.stack);
            alert(err);
        }
    );
}
