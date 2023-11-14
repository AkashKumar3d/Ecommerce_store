import React, { Fragment, useRef, useState, useEffect } from "react"
import "./LoginSignup.css"
import Loader from "../layouts/Loader/Loader.jsx"
import { Link, useNavigate } from "react-router-dom"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector, } from "react-redux";
import { getuser, registeruser } from "../../Features/UserSlice";
import { useAlert } from "react-alert";

const LoginSignUp = ({location}) => {
  let alerts = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null
  })


  // const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  // const [converturl, setconverturl] = useState("/Profile.jpg");
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);



  const { loginuser, loading, error, isAuthenticated  } = useSelector((state) => state.user)
    // console.log(isAuthenticated, "isauthen")
  // login handler
  const LoginSubmit = (e) => {
    e.preventDefault()
    dispatch(getuser({ loginEmail, loginPassword }))
    console.log("login submitted")
  }

  
  const handleRegister = (e) => {
    e.preventDefault()
    dispatch(registeruser(users))
  }

  const handleUserInput = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUsers((prevState) => ({ ...prevState, [e.target.name]: reader.result }))
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setUsers((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
  }

  const redirect=window.location.search ? window.location.search.split("=")[1] : "/account"
  useEffect(() => {
    if (error) {
      alerts.error(error);
    }

    if(isAuthenticated === true) {
      navigate(redirect)
    }
   
  }, [dispatch, alerts, error, navigate,isAuthenticated, redirect ])

  //   for switching the one login to regiter here 
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
    <Fragment>
      {
        // loading ? (<Loader />) : <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                  <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={LoginSubmit}>
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
                onSubmit={handleRegister}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    id="name"
                    name="name"
                    value={users.name}
                    onChange={handleUserInput}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    id="email"
                    name="email"
                    value={users.email}
                    onChange={handleUserInput}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    name="password"
                    value={users.password}
                    onChange={handleUserInput}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleUserInput}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>

        // </Fragment>
      }
    </Fragment>
  )
}
export default LoginSignUp