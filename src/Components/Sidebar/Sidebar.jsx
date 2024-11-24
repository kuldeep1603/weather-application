import React from 'react';
// style 
import "./Sidebar.css";

// icons 
import { IoRainy } from "react-icons/io5";
import { IoIosPartlySunny } from "react-icons/io";
import { BsCloudSnowFill } from "react-icons/bs";

// redux 
import { useDispatch } from 'react-redux';
import { SetSearchValue } from '../../Apis/Slice/Data';

// toast 
import { toast } from 'react-toastify';


const country = [
    { country: "India", city: "Noida", weather: "Cloudy", icons: <IoRainy size={"30px"} style={{ color: "yellow" }} /> },
    { country: "China", city: "Beijing", weather: "Cloudy", icons: <IoRainy size={"30px"} style={{ color: "yellow" }} /> },
    { country: "Dubai", city: "Arab Emirates", weather: "Mostly Sunny", icons: <IoIosPartlySunny size={"30px"} style={{ color: "yellow" }} /> },
    { country: "Canada", city: "Charlottetown", weather: "Light SnowShower", icons: <BsCloudSnowFill size={"30px"} style={{ color: "yellow" }} /> },
];

const Sidebar = () => {
    const dispatch = useDispatch();

    // handle onclick
    const handleClick = (cityName) => {
        dispatch(SetSearchValue(cityName));
        toast.success(`Weather Condition for ${cityName}`);
    };

    return (
        <>
            <div className="col-12 mb-3">
                <ul className='d-flex m-0 p-0 justify-content-between align-items-center'>
                    <li>
                        <p className='p-0 fw-500 fs-16 m-0'>Other Cities</p>
                    </li>
                    <li>See All</li>
                </ul>
            </div>
            {
                country.map((CurCountry, index) => {
                    const { country, city, weather, icons } = CurCountry;
                    return (
                        <div className="col-lg-12 col-md-4 col-sm-6 col-12 mb-3">
                            <div className="card px-4 mb-3 card-body rounded-4 bg-secondary-1 text-white" key={index} onClick={() => handleClick(city)}>
                                <ul className='d-flex m-0 p-0 justify-content-between align-items-center'>
                                    <li className='d-flex flex-column gap-1'>
                                        <p className='fw-500 fs-14 light-color text-ellipsis m-0 p-0'>{country}</p>
                                        <span className='fs-18 fw-400'>{city}</span>
                                        <span className='fs-15 fw-400'>{weather}</span>
                                    </li>
                                    <li>
                                        {icons}
                                    </li>
                                </ul>
                            </div>
                        </div>

                    )
                })
            }
        </>
    )
}

export default Sidebar;
