import React from 'react'
// style 
import "./Navbar.css";

// icons 
import { IoIosSearch } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { CiBellOn } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";


import { Link } from 'react-router-dom';

// redux toolkit
import { SetSearchValue } from '../../Apis/Slice/Data';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// img 
const user_profile = "./img/Kuldeep_Mourya.jpg";
// img

const Navbar = () => {
    const dispatch = useDispatch();
    const query = useSelector((state) => state.weather.Searchvalue);
    const FavData = useSelector((state) => state.weather.Fav);
    const email = useSelector((state) => state.weather.email); // Fetch email from auth slice


    // search fun 
    const HandleSearch = (data) => {
        dispatch(SetSearchValue(data));
    }
    // Get the first letter of the email
    const firstLetter = email ? email.charAt(0).toUpperCase() : null;
    return (
        <>
            <header className='header bg-primary-1 py-3'>
                <div className="container">
                    <div className="row">
                        <div className="col-5 d-md-block d-none">
                            <ul className='d-flex m-0 p-0 gap-3 align-items-center'>
                                <li>
                                    <Link to={"/"} className="px-2 py-2 d-flex justify-content-center align-items-center text-white rounded-circle bg-tertiary-1">
                                        <CgMenuGridO size={22} />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="px-2 py-2 d-flex justify-content-center align-items-center text-white rounded-circle bg-tertiary-1">
                                        <CiBellOn size={22} />
                                    </Link>
                                </li>
                                <li className='d-flex gap-2 align-items-center'>
                                    <CiLocationOn size={22} />
                                    <span>Mumabi ,India</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-9 col-8">
                            <form action="#" autoComplete='off'>
                                <div class="input-group">
                                    <span class="input-group-text ps-4 bg-tertiary-1 text-white border-0" id="basic-addon1"><IoIosSearch size={22} /></span>
                                    <input type="text" onChange={(e) => HandleSearch(e.target.value)} className='form-control py-2 bg-tertiary-1 border-0 text-white' placeholder='Search City' value={query} />
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                            <ul className='d-flex m-0 p-0 justify-content-end align-items-center flex-wrap gap-sm-3 gap-1'>
                                <li>
                                    <Link to={"/Favourite"} className="px-2 py-2 d-flex justify-content-center align-items-center text-white rounded-circle position-relative bg-tertiary-1">
                                        <CiHeart size={25} />
                                        <span className="position-absolute favlength bg-blue px-2 py-1 fs-10 rounded-circle ">{FavData.length}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"}>
                                        {firstLetter ? (
                                            <div class="dropdown">
                                                <button class="px-2 py-2 d-flex justify-content-center align-items-center primary-color fw-600 rounded-circle position-relative bg-yellow dropdown-toggle" type="button" id="user-menu" data-toggle="dropdown" >
                                                    {firstLetter}
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="user-menu">
                                                    <NavLink class="dropdown-item primary-color text-center" to="/login">Logout</NavLink>
                                                </div>
                                            </div>

                                        ) : (
                                            <img src={user_profile} alt="user" title='user' loading='lazy' className='img-fluid user-profile rounded-circle object-fit-cover' />
                                        )}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar

//     <div div className = "px-3 py-2 d-flex justify-content-center align-items-center primary-color fw-600 rounded-circle position-relative bg-yellow" >
//         { firstLetter }
// </div >
