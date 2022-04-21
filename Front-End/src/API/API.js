import axios from "axios";
import events from "events";


export class API {


    async addEvent(events){
        const responsePost = await axios.post("/admin-page",events)
        return responsePost;

    }

    async getEvent(){
        const responseGet = await axios.get("/admin-page")
        return responseGet;

    }


    async deleteEvent(eventName, eventId){
        const responseGet = await axios.delete("/admin-page" + "/" + eventId + "/" + eventName)
        return responseGet;

    }

    async addUser(user){
        const responsePost = await axios.post("/login-page",user)
        return responsePost;

    }

    async getUser(userName){
        const responseGet = await axios.get("/login-page/" + userName)
        return responseGet;

    }

    async deleteUser(userName, userId){
        const responseGet = await axios.delete("/login-page" + "/" + userId + "/" + userName)
        return responseGet;

    }



}