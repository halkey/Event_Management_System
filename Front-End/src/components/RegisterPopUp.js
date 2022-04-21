import React, {useRef, useState} from "react";
import "../CSS/RegisterPopUp.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {toast, ToastContainer} from "react-toastify";
import {API} from "../API/API";
import {feedBack} from "./AdminPage";


function RegisterPopUp(){

    const [user, setUser] = useState([{
        userName : null,
        password : null,
        email : null,
        name : null,
        surName : null,
        ssn : null,
        profession : null,
        registeredEvents: null,
    }]);

    const userApi = new API()

    const addUser = async (model) =>{
        let messageResponse = await userApi.addUser(model);
        feedBack(messageResponse.data.message, messageResponse.data.messageResponse);
        console.log(messageResponse.data.messageResponse);
        console.log(messageResponse.data.message);
        if(!(messageResponse.data.messageResponse === "ERROR")){
            user.userName = user.password = user.email = user.name = user.surName = user.ssn = user.profession = null;
            closeTooltip();
        }

    }
    async function submitStateUser() {
        if ((user.userName ===  user.password && user.email ===  user.name &&  user.surName === user.ssn))
        {
            feedBack("Please Fill In the Blanks ","ERROR")

        }
        else {
            await addUser(user)
        }
    }

    function handleNewInputUser(userr){

        const inputName = userr.target.name;

        const  newUser = {...user};

        switch (inputName)
        {
            case "userName":
                newUser.userName = userr.target.value;
                break;

            case "password":
                newUser.password = userr.target.value;
                break;

            case "email":
                newUser.email = userr.target.value;
                break;

            case "name":
                newUser.name = userr.target.value;
                break;

            case "surName":
                newUser.surName = userr.target.value;
                break;

            case "ssn":
                newUser.ssn = userr.target.value;
                break;

            case "profession":
                newUser.profession = userr.target.value;
                break;
        }
        setUser(newUser)
    }

    const ref = useRef();
    const closeTooltip = () => ref.current.close();

    return(
        <>
        <ToastContainer className={"toast"}/>
        <Popup
            className="pop-up"
            trigger={<button className="register-button"> Register </button>}
            position="top center"
            ref={ref}
        >
            <div className="pop-up-inputs">

                <input type="text" onChange={handleNewInputUser} name={"userName"} placeholder="Username"/>
                <input type="text" onChange={handleNewInputUser} name={"password"} placeholder="Password"/>
                <input type="text" onChange={handleNewInputUser} name={"email"} placeholder="E-Mail"/>
                <input type="text" onChange={handleNewInputUser} name={"name"} placeholder="Name"/>
                <input type="text" onChange={handleNewInputUser} name={"surName"} placeholder="Surname"/>
                <input type="number" onChange={handleNewInputUser} name={"ssn"}  placeholder="SSN"/>
                <input type="text" onChange={handleNewInputUser} name={"profession"} placeholder="Profession"/>
            </div>
            <button onClick={submitStateUser} className="register-now-button">Register Now</button>


        </Popup>

        </>

    );
}

export default RegisterPopUp;