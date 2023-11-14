import React, { Fragment,  useState, useEffect } from "react"
import "./UpdateProfile.css"
import Loader from "../layouts/Loader/Loader.jsx"
import { Link ,useNavigate } from "react-router-dom"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector, } from "react-redux";
import MetaData from '../layouts/MetaData'

import { Updateprofile, loadUser } from "../../Features/UserSlice";
import { useAlert } from "react-alert";

const UpdteProfile = () => {
    const dispatch = useDispatch()
    let alert = useAlert()
  const { loginuser, loading , error, isUpdated} = useSelector((state) => state.user)
  console.log(loginuser, "loginupdate")
    const navigate=useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    console.log("enter the update button")
    e.preventDefault();
    console.log("second console log")
    // const myForm = new FormData();
     const id=loginuser?.user?._id
     console.log(id , "ifdid")
     const obj ={
        "name": name,
        "email": email,
        "avatar":avatar
     }
    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("avatar", avatar);
    console.log(obj, "myform")
    dispatch(Updateprofile({obj, id}));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
        console.log(avatar, "onload")
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (loginuser) {
      setName(loginuser?.user?.name);
      setEmail(loginuser?.user?.email);
      setAvatarPreview(loginuser?.user?.avatar?.url);
    }

    if (error) {
      alert.error(error);
    //   dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account")

     
    }
  }, [dispatch, error, alert, navigate, loginuser, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdteProfile