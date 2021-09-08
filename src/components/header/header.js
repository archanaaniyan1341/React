import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedInfo } from "../../actions";
import "./header.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";

const Header = () => {
    const user = useSelector((state) => state.user);
    const passedParams = useParams();
    const history = useHistory();
    const dispatch =useDispatch();
    let markup = "";
    const logout = () => {
        localStorage.clear();
        history.push('/');
    }
    const goToHome = () => {
        dispatch(setSelectedInfo(0));
        history.push('/Layouts')
    }
    if(passedParams.pathwayId && passedParams.patientId) {
        markup = (
            <span onClick={() => goToHome()} className="mt-2 ml-4 pt-1 pb-0 float-left btn-success btn header-span home-btn">
                    <FontAwesomeIcon icon={faHome} />
                    <label className="pl-1">Home</label>                
            </span>
        )
    }
    return (
        <header className="main-header bg-dark">
            { markup }
            <span className="pt-1 float-right header-span user-icon">
                <label className="pt-2 pr-2">{user.role || localStorage.getItem("userRole")}</label>
                <span className="circle"><FontAwesomeIcon icon={faUser} /></span>
            </span>
            <span className="pr-0 float-right header-span logout-link">
                <a href="/" onClick={() => logout()}className="pt-3 pr-0">Logout</a>
            </span>
        </header>
    )
}

export default Header;