import axios from "axios";

export const retrieveHelloWorldPathVariable = (username:string) =>{
    axios.get(`http://localhost:5000/say-hello/${username}`)
}

