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
                        fetch('http://localhost:3000/online', {
                            method: 'DELETE',
                            headers:{'Content-Type': 'application/json' },
                            body: JSON.stringify({email:localStorage.getItem("email")})
                        })
                            .then(res => res.json()) // or res.json()
                            .then(()=>{
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
                                }

                            ).then(()=>{
                            let deleteToken={"token":localStorage.getItem("accessToken")}
                            fetch('http://localhost:3000/logout', {
                                method: 'DELETE',
                                body: JSON.stringify(deleteToken)
                            })
                                .then(res => res.json()) // or res.json()
                                .then(res => console.log(res))

                        })


                    }}) }




}