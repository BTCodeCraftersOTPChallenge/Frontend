import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


//Endpoints:
const endpoint = {
    default: '/otpmanager'
};

//Login with OTP: http://localhost:5210/otpmanager/loginWithOTP:
function loginWithOTP(encryptedOTP, callback){
    let request = new Request(HOST.backend_api + endpoint.default + "/loginWithOTP", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(encryptedOTP)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

//Generate OTP: http://localhost:5210/otpmanager/generateOTP:
function generateOTP(callback) {
    let request = new Request(HOST.backend_api + endpoint.default + "/generateOTP", {
        method: 'GET',
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    loginWithOTP,
    generateOTP,
};






