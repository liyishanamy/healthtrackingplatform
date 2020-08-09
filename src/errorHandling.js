import store from "./store/store";
import {setLogin, setRole} from "./login_Actions";

export function errorHandling(response) {

        //Access token expires

        console.log("access token expires",response,new Date().toLocaleString());
        if(response.message==="the token is invalid"){
            // Fetch New token
            const body={
                "token":localStorage.getItem("refreshToken")
            }
            fetch("http://localhost:3000/token",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }).then(response => response.json())
                .then(data => {
                    if(data.message==="The refresh token expires"){
                        console.log("error store",store.getState().loginReducer)
                        if( store.getState().loginReducer==="LOGIN"){
                            this.props.dispatch(setLogin("LOGOUT"))
                            //localStorage.setItem("errorHandle","0")
                            throw data
                        }

                    }else{
                        console.log("save new accesstoken",new Date().toLocaleString())
                        localStorage.setItem("accessToken",data.accessToken)
                        console.log("new token",data.accessToken)
                    }
                    // Refresh token expires
                }).catch(function (response) {
                    console.log("catch data",store.getState().loginReducer)
                    if( store.getState().loginReducer==="LOGIN") {
                        console.log("refresh token expires", new Date().toLocaleString())
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("email");
                        localStorage.removeItem("role");
                        localStorage.removeItem("name");
                        localStorage.removeItem("image")
                        localStorage.setItem("loggedIn", "LOGOUT");
                        //alert("Your session is expired")
                        window.location = '/sign-in'
                    }}) }




}