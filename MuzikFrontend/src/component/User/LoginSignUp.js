import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
//import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import {toast} from "react-hot-toast";
import Axios from "axios";
import { setAuthToken } from "../../helpers/setAuthToken";

const LoginSignUp = ({ history, location }) => {
  // const dispatch = useDispatch();
  // const alert = useAlert();

  // const { error, loading, isAuthenticated } = useSelector(
  //   (state) => state.user
  // );
  const navigate = useNavigate();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  // const [loginUsername, setLoginUsername] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    firstname: "",
    lastname:"",
    email: "",
    password: "",
    username: ""
  });

  const { firstname,lastname, email, password, username } = user;


  const loginSubmit = (e) => {
    e.preventDefault();
    //dispatch(login(loginEmail, loginPassword));

    Axios.post("/api/AdminAuth/Login", {
      "adminEmailAddress":loginEmail,
      "password":loginPassword
    }).then(response => {
      localStorage.setItem("jwt",response.data);
      localStorage.setItem("type","admin");

      setAuthToken(response.data);
      navigate("/admin/Home");
    }).catch(response => {
      Axios.post("/api/Auth/Login",{
        "email":loginEmail,
        "password":loginPassword
      }).then(response => {
        localStorage.setItem("jwt",response.data);
        localStorage.setItem("type","user");
        localStorage.setItem("userEmail",loginEmail);
        setAuthToken(response.data);
        navigate("/");
      }).catch(response => {
        toast.error(response.data);
      })
    })
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("firstname", firstname);
    myForm.set("lastname", lastname);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("username", username);
    //dispatch(register(myForm));

    Axios.post("/api/Auth/Register", {
      "firstname" : firstname,
      "lastname" : lastname,
      "username" : username,
      "email" : email,
      "password" : password
    }).then(response => {
      console.log(response.data);
      toast.success(response.data);
      switchTabs(null,"login");
    }).catch(response => {
      console.log(response.data);
      toast.error("Something went wrong");
    })

  };

  const registerDataChange = (e) => {
    
      setUser({ ...user, [e.target.name]: e.target.value });
  
  };

  // const redirect = location.search ? location.search.split("=")[1] : "/account";

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //    // dispatch(clearErrors());
  //   }

  //   if (isAuthenticated) {
  //     history.push(redirect);
  //   }
  // }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    // <Fragment>
    //   {loading ? (
    //     <Loader />
    //   ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">

              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                {/* <div className="loginEmail">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </div> */}
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    name="firstname"
                    value={firstname}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lastname"
                    value={lastname}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    name="username"
                    value={username}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
    //   )}
    // </Fragment>
  );
};

export default LoginSignUp;