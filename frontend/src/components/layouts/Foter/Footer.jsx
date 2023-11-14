import React from 'react'
import playstore from "../../../images/playstore.png";
import Appstore from "../../../images/Appstore.png";
import "./footer.css"
const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>DOWNLOAD FOR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playstore} alt="playstore" />
            <img src={Appstore} alt="appstore" />
        </div>
        <div className="midFooter">
            <h1>Ecommerce</h1>
            <p>High Quality is our first priority</p>
            <p>Copyright 2021 &copy; MeAkashSingh</p>
        </div>
        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="">Github</a>
            <a href="">Linkdin</a>
            <a href="">Instagram</a>
            {/* <a href=""></a> */}
        </div>
    </footer>
  )
}

export default Footer