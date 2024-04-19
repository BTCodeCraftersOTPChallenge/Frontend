import React, {useContext, useEffect, useRef} from 'react';
import './home-container.css';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap';
import backgroundImg from '../commons/images/Background1.jpg'
import HomeForm_Login from "./components/home-form_login";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import * as API_HOME from "./api/home-api"
import {useState} from 'react'
// import { count } from 'console';
// import {AppContext} from "../App";


export default function HomeContainer() {

    const [OTP, setOTP] = useState("*- - - - - - - - - - - -*");
    //You can use local storage anywhere:
    // localStorage.setItem("encryptedOTP", "*- - - - - - - - - - - -*");
    // localStorage.setItem("decryptedOTP", "*- - - - - - - - - - - -*");
    const [selectLogin, setSelectLogin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginOrLogoutPage, setLoginOrLogoutPage] = useState(<div></div>);

    //Timer:
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);

        if(minutes < 10) minutes = '0' + minutes;
        if(seconds < 10) seconds = '0' + seconds;

        //Timer:
        return minutes + " : " + seconds;
    }

    // const stopReload = (e) => {
    //     e.preventDefault();
    // }

    //How many seconds is setable from here:
    const[countdown, setCountdown] = useState(0);
    const[seconds, setSeconds] = useState(30); //5;
    // localStorage.setItem("seconds", seconds);
    const timerId = useRef();
    const [disableGenerateOTP, setDisableGenerateOTP] = useState(false);

    useEffect(() =>{
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1)
            // localStorage.setItem("seconds", countdown);
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [countdown])

    useEffect(() => {
        //If it is not 0 you cannot reload the page;
        if(countdown <= 0)
        {
            clearInterval(timerId.current)
            setDisableGenerateOTP(false);
            localStorage.setItem("encryptedOTP", "*- - - - - - - - - - - -*");
            localStorage.setItem("decryptedOTP", "*- - - - - - - - - - - -*");
            // alert("End of timer.");
        }
        else
        {
            // window.preventDefault();

            //See if you are logged in, 
            //you need to be logged in while the countdown is > 0;
            //If you are logged in, it changed the loggedIn value;
            // var loggedInLocal = localStorage.getItem("loggedIn");

            // if(loggedInLocal === true)
            // {
            //     setLoggedIn(true);
            // }
            // else
            // {
            //     setLoggedIn(false);
            // }
        }
    }, [countdown]) //, loggedIn])

    //Generate OTP:
    function encrypt(text, key) {
        var crypto = require('crypto');
        var alg = 'des-ede-cbc';
        var key = new Buffer(key, 'utf-8');
        //This is from c# cipher iv
        var iv = new Buffer('QUJDREVGR0g=', 'base64');    
      
        var cipher = crypto.createCipheriv(alg, key, iv);
        var encoded = cipher.update(text, 'ascii', 'base64');
        encoded += cipher.final('base64');
      
        return encoded;
    }

    function decrypt(encryptedText, key) {
        var crypto = require('crypto');
        var alg = 'des-ede-cbc';
        var key = new Buffer(key, 'utf-8');
         //This is from c# cipher iv
        var iv = new Buffer('QUJDREVGR0g=', 'base64'); 
      
        var encrypted = new Buffer(encryptedText, 'base64');
        var decipher = crypto.createDecipheriv(alg, key, iv);
        var decoded = decipher.update(encrypted, 'binary', 'ascii');
        decoded += decipher.final('ascii');
      
        return decoded;
    }

    const handleGenerateOTP = () =>
    {
        console.log("The OTP has been received.");

        generateOTP();
    }

    const generateOTP = () => {
        return API_HOME.generateOTP((result, status) => {
            //The OTP was received in crypted form:
            if (result !== null && (status === 200 || status === 201))
            {
                //It already started, so block it until it is done
                // if(countdown > 0)
                // {
                //     //It stops the time:
                //     // window.alert("Wait until the timer reaches 0 to try again!");
                //     // alert("Wait until the timer reaches 0 to try again!");

                //     return;
                // }

                //this.reloadHandler();
                console.log("Encrypted OTP: " + result + " .");

                //The secret key, both in BE and FE the same:
                var secretKey = 'rktlqtuixakparuo';
                localStorage.setItem("secretKey", secretKey);

                //Decrypt:
                var decryptedOTP = decrypt(result, secretKey);
                console.log("Decrypted OTP: " + decryptedOTP);
                localStorage.setItem("decryptedOTP", decryptedOTP);

                //Save OTP both here and in local storage: (the encrypted in local storage)
                setOTP(decryptedOTP);
                localStorage.setItem("encryptedOTP", result);

                //Now I start the timer: No delay:
                setCountdown(seconds);
                // setCountdown(localStorage.getItem("seconds", seconds));

                //I block the button:
                setDisableGenerateOTP(true);

                //No delay:
                // window.alert("The OTP was generated successfully");
            }
            else {
                // window.alert("No OTP available! Try again!");
            }
        });
    }


    //Set modal login:
    const toggleFormLogin = () => {
        setSelectLogin(!selectLogin);

        // console.log("Login Form!");
    }


    //Logout:
    const userLogout = () => {
        localStorage.setItem("loggedIn", false);
        // setLoggedIn(localStorage.getItem("loggedIn"));
        setLoggedIn(false);
        //Erase OTP:
        setOTP("*- - - - - - - - - - - -*");
        // localStorage.setItem("encryptedOTP", "*- - - - - - - - - - - -*");
        localStorage.setItem("encryptedOTP", "*- - - - - - - - - - - -*");
        localStorage.setItem("decryptedOTP", "*- - - - - - - - - - - -*");
    }


    // useEffect(() => {
    //     var loggedInLocal = localStorage.getItem("loggedIn");
    //     // var loggedInLocal = loggedIn;

    //     if(loggedInLocal === true)
    //     {
    //         setLoggedIn(true);
    //     }
    //     else
    //     {
    //         setLoggedIn(false);
    //     }
    // })

    useEffect(() => {

            //Not logged in:
            //You need to change from local storage, not local variable, and it is string:
            // if(loggedIn === false)
            if(localStorage.getItem("loggedIn") === 'false')
            {
            //Login button:
            setLoginOrLogoutPage(<div>

            {/* Login: */}
            <div>
                <p className="home-loginP">
                    Insert OTP here:
                </p>

                {/* Button: */}

            </div>

            {/* Generate OTP: */}
            <div>
                <p className="home-generateOTP">
                    Generate OTP here:
                </p>

                {/* Button: */}

                <Button type={"submit"} 
                        onClick={() => handleGenerateOTP()}
                        // Block or not based on timer:
                        disabled={disableGenerateOTP}
                        style = {{
                              backgroundColor: '#ab1111',
                              marginLeft: '-11.5vmax',
                              marginTop: '34vmax',
                              width: '20vmax',
                              height: '6vmax',
                              fontSize: '2vmax',
                              color: 'black !important',
                              borderRadius: '50px 50px 50px 50px !important',
                              border: '#000000 solid 3px !important',
                              position: 'absolute',
                              zIndex: 10,
                            }}>
                    Generate OTP
                </Button>

                <p className="home-OTPtext">
                    When you generate the OTP, 
                    <br></br>
                    it will appear here:
                </p>

                <p className="home-OTP">
                    {/* {OTP} */}
                    {/* {localStorage.getItem("encryptedOTP")}  */}
                    {localStorage.getItem("decryptedOTP")}
                </p>

                <p className="home-OTPtimer">
                    Timer (until reset): 
                    <br></br>
                    {formatTime(countdown)}
                    {/* {countdown} */}
                </p>

            </div>

            <Button
                className = "home-loginStyle"
                onClick={toggleFormLogin}
                //Invers fata de generate:
                disabled={!disableGenerateOTP}
            > Login 
            </Button>

            </div>); 
        }
        else
        {
            //Logged in:
            setLoginOrLogoutPage(
                <div>
                    <p className="home-logoutP">
                        Hello, and welcome to the new page!
                    </p>

                    <Button
                        className = "home-logoutStyle"
                        onClick={() => userLogout()}
                    >
                        Logout
                    </Button>
                </div>
            );
        }
    }
    , [loggedIn, OTP, countdown, disableGenerateOTP]);


    return (
        <div className="home">

            {/*Title:*/}
            <div>
                <div className="home-divTitle"></div>

                <p className="home-title">
                    BT Code Crafters OTP
                </p>
            </div>


            {/* Logged in or logged out, different parts of the page: */}
            {loginOrLogoutPage}


            {/* For both: */}
            <img src={backgroundImg}  alt = "Background"
                     //  width = "1518vmax" 
                     width = "100%"
                     height = "736vmax" 
                     style = {{opacity : "0.4"}}>
            </img> 


            {/*Login modal:*/}
            <Modal
                    isOpen={selectLogin}
                    toggle={toggleFormLogin}
                    size="lg"
                    style = {{borderRadius: "20% !important"}}
            >
                <ModalHeader
                        style={{backgroundColor: '#98b9ec',
                            textAlign: "center",
                            paddingLeft: "45%",}}
                        toggle={toggleFormLogin}>
                        <strong>
                            Login:
                        </strong>
                </ModalHeader>

                <ModalBody
                        style={{backgroundColor: '#98b9ec'}}
                >
                    <HomeForm_Login
                            reloadHandler={() => toggleFormLogin()}
                    />
                </ModalBody>
            </Modal>

        </div>
    );
}