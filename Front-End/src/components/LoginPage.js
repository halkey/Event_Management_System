import React, {useState} from "react";
import "../CSS/LoginPage.css";
import 'reactjs-popup/dist/index.css';
import login_bg from "../assets/login-page-background.jpg"
import RegisterPopUp from "./RegisterPopUp";
import logo from "./Logo.js"
import {API} from "../API/API";
import {toast, ToastContainer} from "react-toastify";


function LoginPage() {

    const [userLogin, setUserLogin] = useState([{
        id : null,
        userName : null,
        password : null,
        email : null,
        name : null,
        surName : null,
        ssn : null,
        profession : null,
    }]);
    const userApi = new API()
    const getUser = async() => {
        if(userLogin.userName === userLogin.password && userLogin.userName ==="admin")
        {
            window.location.href = "/admin-page";
        }
        else {
            const messageResponse = await userApi.getUser(userLogin.userName);
            console.log(messageResponse);
            if (messageResponse.data.userName === "ERROR") {
                toast.error(messageResponse.data.password)
            } else {
                if (messageResponse.data.password === userLogin.password) {
                    setUserLogin([{
                        id : null,
                        userName: null,
                        password: null,
                        email: null,
                        name: null,
                        surName: null,
                        ssn: null,
                        profession: null,
                    }])
                    window.location.href = "/user-page/" + messageResponse.data.userName;
                }
                else {
                    toast.error("Password is Invalid!");
                }
            }
        }
    }
    function handleLogin(event) {
        const inputName = event.target.name;
        const  newUserLogin = {...userLogin};

        switch (inputName)
        {
            case "userName":
                newUserLogin.userName = event.target.value;
                break;

            case "password":
                newUserLogin.password = event.target.value;
                break;
        }
        setUserLogin(newUserLogin);
    }
    return (

        <div className="site">
            <img id="background" src={login_bg} alt="login page background"/>
            <main className="login-page">
            <header>
                <h1>EVENT MANAGEMENT SYSTEM</h1>
                <img src={logo} alt="TUBITAK BILGEM YTE LOGO"/>
            </header>
            <ToastContainer/>
            <div className="login-form">
                    <input onChange={handleLogin} name={"userName"} type="text" placeholder="Username"/>
                    <input onChange={handleLogin} name={"password"} type="text" placeholder="Password"/>
                    <div className="login-form-remember-me">
                        <div>
                            <input type="checkbox"/>
                            <p>Remember Me</p>
                        </div>
                        <button>Forgot My Password</button>
                    </div>
                    <div className="login-form-login-register-button">
                        <button onClick={getUser}>Login</button>
                    </div>
                </div>

                <div className="pop-up">
                    <RegisterPopUp/>
                </div>

            </main>

        </div>



);
}
export default LoginPage;