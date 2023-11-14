import React,  {Fragment,useState }from 'react'
import "./Shipping.css"
import { useSelector, useDispatch  } from "react-redux";
import { ShippingInfo } from "../../Features/Cartslice";
import MetaData from "../layouts/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";
const Shipping = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const alert=useAlert()
    const {shippinginfo}=useSelector((state)=>state.cart)
    console.log(shippinginfo, "shipping info")

    const [address, setAddress] = useState(shippinginfo.address ? shippinginfo.address: shippinginfo?.address);
  const [city, setCity] = useState(shippinginfo.city?shippinginfo.city : shippinginfo?.city );
  const [state, setState] = useState(shippinginfo.state ? shippinginfo.state : shippinginfo?.state);
  const [country, setCountry] = useState(shippinginfo.country ? shippinginfo.country: shippinginfo?.country);
  const [pinCode, setPinCode] = useState(shippinginfo.pinCode ? shippinginfo.pinCode : shippinginfo?.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippinginfo.phoneNo ? shippinginfo.phoneNo : shippinginfo?.phoneNo);

  const shippingSubmit =(e)=>{
  e.preventDefault()
  if(phoneNo.length < 10 || phoneNo.length >10){
    alert.error("phone no should be 10 digit")
    return
  }
  dispatch(ShippingInfo({address, city, state, country, pinCode, phoneNo}))
  navigate("/order/confirm")
  }
  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )} 

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Shipping