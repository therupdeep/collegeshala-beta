var userAuth = window.userAuth || {};

var signinUrl = 'login.html';

var poolData = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId
};

var userPool;

if (!(_config.cognito.userPoolId &&
        _config.cognito.userPoolClientId &&
        _config.cognito.region)) {
    alert('Error loading data!');
}

userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

if (typeof AWSCognito !== 'undefined') {
    AWSCognito.config.region = _config.cognito.region;
}

userAuth.signOut = function signOut() {
    userPool.getCurrentUser().signOut();
};

userAuth.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
        cognitoUser.getSession(function sessionCallback(err, session) {
            if (err) {
                reject(err);
            } else if (!session.isValid()) {
                resolve(null);
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
        Name: 'email',
        Value: userData.email
    };
    var name = {
        Name: 'name',
        Value: userData.name
    }
    console.log(userData.phone,typeof(userData.phone));
    var attributePhone = new AmazonCognitoIdentity.CognitoUserAttribute(dataMail);
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(name);

    userPool.signUp(userData.email, userData.password, [attributePhone,attributeName], null,
        function signUpCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        }
    );
}

function verify(phone, code, onSuccess, onFailure) {
    createCognitoUser(phone).confirmRegistration(code, true, function confirmCallback(err, result) {
        if (!err) {
            onSuccess(result);
        } else {
            onFailure(err);
        }
    });
}

function logIn(userData ,onSuccess, onFailure) {
    const email = userData.email;
    const password = userData.password;
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password
    });
    console.log(authenticationDetails);
    var cognitoUser = createCognitoUser(email);
    console.log('cognitouser',cognitoUser);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: onSuccess,
        onFailure: onFailure
    });
}

function createCognitoUser(phone) {
    return new AmazonCognitoIdentity.CognitoUser({
        Username: phone,
        Pool: userPool
    });
}