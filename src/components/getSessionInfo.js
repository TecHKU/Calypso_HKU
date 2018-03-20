import axios from "axios/index";

let getSessionInfo = async() => {
    const response = await axios.get('/api/sessionDetail', {withCredentials: true});
    if(response.data.user){
        return response.data.user;
    }
    else{
        return null;
    }
};

export default getSessionInfo;