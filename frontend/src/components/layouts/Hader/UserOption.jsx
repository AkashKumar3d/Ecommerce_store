import react, { useState, Fragment } from "react"
import "./Hader.css"
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import Backdrop from '@mui/material/Backdrop'
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import { useNavigate} from "react-router-dom"
import { useDispatch ,useSelector} from "react-redux";
import {useAlert } from "react-alert"
import { logout } from "../../../Features/UserSlice";


const UserOption = ({ user }) => {
    // console.log(user.user.avatar.url, "logedin user")
    const {carts}=useSelector(state=>state.cart)
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const alert = useAlert()
    // console.log(user.data.user, "useroption user access")
    const [open, setopen] = useState(false)
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{color:carts.length > 0 ? "tomato": "unset"}} />, name: `Cart(${carts.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
    ]

    if (user?.data?.user?.role === "Admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard
        })
    }

    function orders() {
        navigate("/orders")
    }

    function dashboard() {
        navigate("/admin/dashboard")
    }

    function account() {
        navigate("/account")
    }

    function cart() {
        navigate("/cart")
    }

    function logoutUser() {
        dispatch(logout())
        
        alert.success("You have been logged out")
        navigate("/login")
        
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{zIndex:10}}/>
            <SpeedDial
            className="speedDial"
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setopen(false)}
                onOpen={() => setopen(true)}
                style={{zIndex:11}}
                open={open}
                direction="down"
                icon={<img className="speedDialIcon" src={user?.data?.user?.avatar?.url ? user?.data?.user?.avatar?.url  : "/Profile.png"} alt="Profile" />}

            >

                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default UserOption;