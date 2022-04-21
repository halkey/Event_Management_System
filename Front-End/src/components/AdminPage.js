import React, {useState} from "react";
import "../CSS/AdminPage.css";
import logo from "./Logo.js"
import admin_bg from "../assets/admin-background.jpg"
import {Button, Modal} from 'semantic-ui-react'
import 'react-calendar/dist/Calendar.css';
import {API} from "../API/API";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserPage, {myLoginedUser} from "./UserPage";
import LoginPage, {userLogin} from "./LoginPage";


let count = 0;
let eventCounter = 0;
let noEventsAlert = "";
let okay;
let flag = 1;


export function feedBack(message, response){

    // eslint-disable-next-line default-case
    switch (response)
    {
        case "ERROR":
            toast.error(message);
            break;

        case "SUCCESS":
            toast.success(message);
            break;

        case "WARNING":
            toast.warning(message);
            break;

        case "INFO":
            toast.info(message);
            break;
    }

}

function AdminPage(props)
{

    let eventApi = new API()

    const addEvent = async (model) =>{
        const messageResponse = await eventApi.addEvent(model);
        feedBack(messageResponse.data.message, messageResponse.data.messageResponse);
        console.log(messageResponse.data.messageResponse);
        console.log(messageResponse.data.message);
        okay = null;
        okay = messageResponse.data.messageResponse;
        console.log(okay);
        if(!(messageResponse.data.messageResponse === "ERROR"))
        {
            setEvents([{

            id: null,
            eventName : null,
            eventStartDate : null,
            eventFinishDate : null,
            quota : null,
            }])
        }

        getEvent(setEvents);
        setOpen(false);
    }

    const getEvent = async(setEvents) =>{

        const messageResponse = await eventApi.getEvent();
        setEvents(messageResponse.data);
        if(messageResponse.data.length === 0 && noEventsAlert !== "There are no events") {
            noEventsAlert = "There are no events"
            getEvent(setEvents);
        }

        else
            noEventsAlert = "";
    }

    const deleteEvent = async(setEvents2, id, eventName) => {
        const messageResponse = await eventApi.deleteEvent(eventName, id)
        console.log(messageResponse);
        feedBack(messageResponse.data.message, messageResponse.data.messageResponse);
        getEvent(setEvents2);

    }

    async function updateEvent(setEvents2, id, eventName){

        okay = null;
        await addEvent(events);
        if(okay === "SUCCESS")
            deleteEvent(setEvents2, id, eventName);

        setEvents([{

            id: null,
            eventName : null,
            eventStartDate : null,
            eventFinishDate : null,
            quota : null,
        }])

    }
    const [events, setEvents] = useState([
        {
            id: null,
            eventName : null,
            eventStartDate : null,
            eventFinishDate : null,
            quota : null,

        }]);

        const [events2, setEvents2] = useState([
        {
            id: null,
            eventName : null,
            eventStartDate : null,
            eventFinishDate : null,
            quota : null,

        }]);

    function handleNewInput(event){

        const inputName = event.target.name;
        const  newEvents = {...events};

        switch (inputName)
        {
            case "eventName":
                newEvents.eventName = event.target.value;
                break;

            case "eventStartDate":
                newEvents.eventStartDate = event.target.value;
                break;

            case "eventFinishDate":
                newEvents.eventFinishDate = event.target.value;
                break;

            case "quota":
                newEvents.quota = event.target.value;
                break;


        }
        setEvents(newEvents);
    }

    function submitState() {
        if((events.eventName === events.eventStartDate && events.eventFinishDate === events.quota)){
            toast.error("Please Fill In the Blanks ");
        }
        else if(events.quota === 0 || events.quota === null || events.quota === "" )
        {
            toast.error("Determine Your Quota");
        }
        else{
            console.log(events);
            addEvent(events);
        }
    }
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    return(


        <div className="site-admin-page">
            <img id="background" src={admin_bg} alt="admin page background"/>
            <main className="main-admin-page">
                <header>
                    <img src={logo} alt="TUBITAK BILGEM YTE LOGO"/>
                    <div className="h1s">
                        <h1>EMS</h1>
                        <h1>Administration Panel</h1>
                    </div>
                </header>
                <ToastContainer/>
                <div className="new-list-buttons">
                    <Modal
                        on='click'
                        trigger={<button>New Event</button>}
                        closeIcon
                        size = {"medium"}

                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                    >
                        <Modal.Header>Add a New Event</Modal.Header>
                        <div className={"register-inputs"}>

                            <div className={"register-inputs-small"}>
                                <div className={"labels"}>
                                    <label>Event Name:</label>
                                    <input onChange={handleNewInput} name={"eventName"} type="text" placeholder="Board Meeting"/>
                                </div>
                                <div className={"labels"}>
                                    <label>Event Start Date:</label>
                                    <input onChange={handleNewInput} name={"eventStartDate"} type="date"  defaultValue="2021-08-16"/>

                                </div>
                                <div className={"labels"}>
                                    <label>Event Finish Date:</label>
                                    <input onChange={handleNewInput} name={"eventFinishDate"} type="date" defaultValue="2021-08-17" />
                                </div>
                                <div className={"labels"}>
                                    <label>Quota:</label>
                                    <input onChange={handleNewInput} name={"quota"} type="number" placeholder="50"/>
                                </div>
                            </div>
                            <button className={"add-event-button-admin"} onClick={submitState}>Add a New Event</button>
                        </div>

                    </Modal>
                    <Modal
                        on='click'
                        trigger={<button onClick={() => getEvent(setEvents2)}>List Events</button>}
                        closeIcon
                        size = {"large"}>
                        <Modal.Header>Events List</Modal.Header>
                        <h1 style={{color:'red', fontSize: '50px', display:'flex', justifyContent: 'center'}}>{noEventsAlert}</h1>
                         <div className={"list-events"}>
                                {
                                    (() => {
                                        eventCounter = 0;
                                        let events3 = events2;
                                        return events2.map((events2,count) => {
                                            eventCounter++;
                                            return (
                                                <div key={"list-events-div" + count } className={"list-events-div"}>
                                                    <div className={"list-events-div-events"}>
                                                        <div>
                                                            <h2>{eventCounter + "- " + events2.eventName}</h2>
                                                        </div>
                                                        <div>
                                                            <div className={"list-events-div-events-print"}>S: {events2.eventStartDate}</div>
                                                        </div>
                                                        <div>
                                                            <div className={"list-events-div-events-print"}>F: {events2.eventFinishDate}</div>
                                                        </div>
                                                        <div>
                                                            <div className={"list-events-div-events-print"}>Q: {events2.quota}</div>
                                                        </div>
                                                    </div>
                                                    <div className={"list-events-div-buttons"}>
                                                        <Button onClick={() => deleteEvent(setEvents2, events2.id, events2.eventName)} size="massive" icon='x' className="update-button"/>
                                                        <Button onClick={() => updateEvent(setEvents2, events2.id, events2.eventName)} size="massive" icon='refresh' className="update-button"/>
                                                        <Modal
                                                            on='click'
                                                            trigger={<Button size="massive" icon='write' className="update-button"/>}
                                                            closeIcon
                                                            size = {"medium"}

                                                            onClose={() => setOpen2(false)}
                                                            onOpen={() => setOpen2(true)}
                                                            open={open2}

                                                        >
                                                            <Modal.Header>Add a New Event</Modal.Header>
                                                            <div className={"register-inputs"}>

                                                                <div className={"register-inputs-small"}>
                                                                    <div className={"labels"}>
                                                                        <label>New Event Name:</label>
                                                                        <input onChange={handleNewInput} name={"eventName"} type="text" placeholder="Board Meeting"/>
                                                                    </div>
                                                                    <div className={"labels"}>
                                                                        <label>New Event Start Date:</label>
                                                                        <input onChange={handleNewInput} name={"eventStartDate"} type="date"  defaultValue="2021-08-18"/>

                                                                    </div>
                                                                    <div className={"labels"}>
                                                                        <label>New Event Finish Date:</label>
                                                                        <input onChange={handleNewInput} name={"eventFinishDate"} type="date" defaultValue="2021-08-19" />
                                                                    </div>
                                                                    <div className={"labels"}>
                                                                        <label>New Quota:</label>
                                                                        <input onChange={handleNewInput} name={"quota"} type="number" placeholder="50"/>
                                                                    </div>
                                                                </div>
                                                                <button  onClick={ () => setOpen2(false)} className={"add-event-button-admin"}>Update The Element</button>
                                                            </div>

                                                        </Modal>
                                                    </div>

                                                </div>
                                                )
                                            }
                                        )

                                    })()
                                }
                         </div>
                    </Modal>

                </div>
            </main>
        </div>
    );
    }
export default AdminPage;

