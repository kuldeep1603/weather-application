import React from 'react'
// style 
import "./Fav.css";
// icons 
import { RxCrossCircled } from "react-icons/rx";

import { Link } from 'react-router-dom';

// redux toolkit 
import { useSelector, useDispatch } from 'react-redux';
import { SetRemoveFav } from '../../Apis/Slice/Data';

const Fav = () => {
    const dispatch = useDispatch();
    const FavData = useSelector((state) => state.weather.Fav);
    // remove from cart 
    const RemoveFromCart = (id) => {
        dispatch(SetRemoveFav(id));
    }
    return (
        <>
            <section className='section fav'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <h4 className='fw-500 text-white fs-16 text-capitalize'>Favourite City</h4>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="row ">
                                {
                                    FavData.length == 0 ? (
                                        <>
                                            <div className="col-sm-6 col-12">
                                                <p>No City Addedd to Fav ....!</p>
                                                <Link to={"/"} className='px-2 py-2  rounded-2 bg-tertiary-1 text-center text-white'>Dashboard</Link>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {
                                                FavData.map((CurCity, index) => {
                                                    return (
                                                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" key={CurCity.id}>
                                                            <div className="card rounded-3 bg-blue position-relative" >
                                                                <div className="card-header border-0">
                                                                    <ul className='p-0 m-0 d-flex justify-content-between align-items-center'>
                                                                        <li>
                                                                            <p className='fw-500 text-black m-0 fs-18'>{CurCity.name}</p>
                                                                        </li>
                                                                        <li>
                                                                            <span className='fw-500 text-black fs-18'>{new Date().toLocaleTimeString()}</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="card-body py-1">
                                                                    <ul className='d-flex justify-content-between align-items-center m-0 mb-2 p-0'>
                                                                        <li>
                                                                            <p className='fw-700 fs-26 text-black m-0'>{Math.round(CurCity.main.temp - 273.15)}°C</p>
                                                                            <p className='fw-600 fs-20 text-capitalize text-ellipsis text-black m-0'>{CurCity.weather[0]?.description}</p>
                                                                        </li>
                                                                        <li>
                                                                            <img src={`http://openweathermap.org/img/wn/${CurCity.weather[0]?.icon}.png`} alt={CurCity.weather[0]?.description} title={CurCity.weather[0]?.description} className='img-fluid' loading='lazy' />
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <Link className='remove-from-cart' onClick={() => RemoveFromCart(CurCity.id)}>
                                                                    <RxCrossCircled />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Fav
