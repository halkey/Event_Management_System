import React, {useState} from "react";
import "../CSS/UserPage.css";
import logo from "./Logo.js"
import user_bg from "../assets/user-background.jpg"
import {Icon, Popup, Modal, Button} from 'semantic-ui-react'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {API} from "../API/API";
import {feedBack} from "./AdminPage";

let counter = 0;

let eventNow = "";
export let myLoginedUser = window.location.pathname.toString().split("/", 3 )[2];


function UserPage()
{
    const [user, setUser] = useState([{
        userName : null,
        password : null,
        email : null,
        name : null,
        surName : null,
        ssn : null,
        profession : null,
        id : null,
        registeredEvents: "",
    }]);

    const eventApi = new API()

    const addUser = async (model,nameOfEvent) =>{

        let messageResponse = await eventApi.addUser(([{
            id : model.id,
            userName : model.userName,
            password : model.password,
            email : model.email,
            name : model.name,
            surName : model.surName,
            ssn : model.ssn,
            profession : model.profession,
            registeredEvents: model.registeredEvents = model.registeredEvents + " - " + nameOfEvent,
        }][0]));}

    const deleteUser = async(userName, id) => {
        const messageResponse = await eventApi.deleteUser(userName, id)
    }

    const getEvent = async(setEvents3) =>{
        const messageResponse = await eventApi.getEvent();
        console.log(messageResponse.data)
        setEvents3(messageResponse.data);
    }

    const getUser = async(nameOfEvent) => {
        const messageResponse = await eventApi.getUser(myLoginedUser);
        console.log("aha")
        console.log(messageResponse.data)
        setTemp(messageResponse.data);
        await deleteUser(messageResponse.data.userName, messageResponse.data.id)
        await addUser(messageResponse.data,nameOfEvent);
        let temporal = await eventApi.getUser(myLoginedUser);
        temporal.data.registeredEvents = temporal.data.registeredEvents.replace('null -', '')
        setTemp(temporal.data);
    }

    function isUser(){
        if(!(typeof myLoginedUser === 'string'))
            window.location.href = "/login-page";
    }

    async function registerAnEvent(nameOfEvent) {
        await getUser(nameOfEvent);
    }

    return(

        <div className="site-admin-page">
            <img id="background" src={user_bg} alt="admin page background"/>
            <main className="main-admin-page">
                <header>

                    <img src={logo} alt="TUBITAK BILGEM YTE LOGO"/>
                    <div className="h1s">
                        <h1>EMS</h1>
                        <h1>User Panel</h1>
                        <h2>Welcome " {myLoginedUser} "</h2>
                    </div>
                </header>
                {isUser()}
                <ToastContainer/>
                <div className="new-list-buttons1">
                    <Modal
                        on='click'
                        trigger={<button onClick={() => getEvent(setEvents3)} >List Events</button>}
                        closeIcon
                        size = {"large"}
                        centered = {true}
                    >
                        <Modal.Header>Events List</Modal.Header>
                        <div className={"register-inputs"}>
                            {
                                (() => {
                                    let eventCounter;
                                    eventCounter = 0;
                                    return events3.map((events3,count) => {
                                            eventCounter++;
                                            return (
                                                <>
                                                    <div key={"list-events-div" + count } className={"list-events-div"}>
                                                        <div className={"list-events-register"}>
                                                            <div>
                                                                <h2>{eventCounter + "- " + events3.eventName}</h2>
                                                            </div>
                                                            <div>
                                                                <div className={"list-events-register-print"}>{events3.eventStartDate}</div>
                                                            </div>
                                                            <div>
                                                                <div className={"list-events-register-print"}>{events3.eventFinishDate}</div>
                                                            </div>
                                                            <div>
                                                                <div className={"list-events-register-print"}>{events3.quota}</div>
                                                            </div>
                                                            <div className="register-event-button-div">
                                                                <Button size="massive" onClick={() => registerAnEvent(events3.eventName)} icon='write' className="register-event-button"></Button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </>
                                            )
                                        }
                                    )
                                })()
                            }
                        </div>
                    </Modal>
                    <Modal
                        on='click'
                        trigger={<button>Registered Events</button>}
                        closeIcon
                        size = {"medium"}
                    >
                        <Modal.Header>Registered Events</Modal.Header>
                        <div>



                            {
                                (() => {
                                        counter = 0;

                                            return (
                                                <>

                                                            <div className={"seri"}>
                                                                <h2>{temp.registeredEvents}</h2>
                                                            </div>
                                                </>
                                            )

                                            counter++;




                                })()
                            }




                        </div>


                    </Modal>
                </div>
            </main>
        </div>
    );
}
export default UserPage;