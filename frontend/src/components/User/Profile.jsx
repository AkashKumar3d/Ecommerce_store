import React, { Fragment, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {getuser} from "../../Features/UserSlice"
import Loader from "../layouts/Loader/Loader";
import "./Profile.css"

const Profile = () => {
  const dispatch=useDispatch()
    const { loginuser, loading, isAuthenticated } = useSelector((state) => state.user)
    console.log(loginuser, "isAuthent")
    const navigate = useNavigate()
    useEffect(() => {
        if (!loginuser) {
            navigate("/Login")
        }
        dispatch(getuser)
        // window.location.reload()
    }, [navigate,loginuser, loading,  isAuthenticated])
    return (
        <Fragment>
            {
                loading ? <Loader /> : <Fragment>
                    <MetaData title={loginuser?.user?.name} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={loginuser?.data?.user?.avatar?.url} alt={loginuser?.data?.user?.name} />
                            <Link to="/me/update"  >Edit Profile</Link>
                        </div>
                        <div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{loginuser?.data?.user?.name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{loginuser?.data?.user?.email}</p>
                        </div>
                        <div>
                            <h4>Joined On</h4>
                            <p>{String(loginuser?.data?.user?.createdAt).substr(0, 10)}</p>
                        </div>
                        <div>
                            <Link to="/orders">My Order</Link>
                            <Link to="/password/update">Change password</Link>
                        </div>
                        </div>

                    </div>

                </Fragment>
            }
        </Fragment>

    )
}

export default Profile