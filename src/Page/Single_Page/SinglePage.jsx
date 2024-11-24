import React from 'react';
// style 
import "./SinglePage.css";
import { Tab, Tabs } from 'react-bootstrap';

import { Link } from 'react-router-dom';

// icons
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { SiSalesforce } from "react-icons/si";
import { BiWorld } from "react-icons/bi";

// redux toolkit
import { SetFav } from '../../Apis/Slice/Data';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// imgs 
const wind = "./img/Wind.png";
const uv = "./img/UV.png";
const visibility = "./img/Visibility.png";
const humidity = "./img/Humidity.png";
const getStarted = "./img/Get Started Banner.png";

const SinglePage = ({ currentWeather, forecastData }) => {
    const dispatch = useDispatch();
    // add to fav 
    const AddtoFav = (data) => {
        dispatch(SetFav(data));
        toast.success("City Added to Fav");
    }

    if (!currentWeather || !forecastData || !forecastData.list) {
        return <div>Loading...</div>;
    }
    const todayForecast = forecastData.list.filter(item => new Date(item.dt_txt).getDate() === new Date().getDate());
    const tomorrowForecast = forecastData.list.filter(item => new Date(item.dt_txt).getDate() === new Date().getDate() + 1);
    const nextFiveDaysForecast = forecastData.list.filter(item => new Date(item.dt_txt).getDate() > new Date().getDate() + 1);

    const getWeatherInfo = (dayData) => {
        return {
            temp: dayData[0]?.main.temp,
            wind: dayData[0]?.wind.speed,
            visibility: dayData[0]?.visibility,
            humidity: dayData[0]?.main.humidity,
            uvi: dayData[0]?.main.uvi || 'N/A'
        };
    };

    const todayWeather = getWeatherInfo(todayForecast);
    const tomorrowWeather = getWeatherInfo(tomorrowForecast);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
    };

    return (
        <>
            <div className="row singlepage position-relative">
                <div className="col-lg-3 col-md-4 col-sm-5 col-6  add-to-fav">
                    <Link onClick={() => AddtoFav(currentWeather)} className="text-white d-block fs-14 w-100 bg-tertiary-1 text-center px-2 py-1 rounded-2">Add to Fav City</Link>
                </div>
                <div className="col-12 tabs mb-4">
                    <Tabs defaultActiveKey="Today" className='mb-3'>
                        {/* todays  */}
                        <Tab eventKey="Today" title="Today">
                            <div className="row">
                                <div className="col-md-4 mb-lg-0 mb-4">
                                    <div className="card rounded-3 bg-blue">
                                        <div className="card-header border-0">
                                            <ul className='p-0 m-0 d-flex justify-content-between align-items-center'>
                                                <li>
                                                    <p className='fw-500 text-black m-0 fs-18'>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
                                                </li>
                                                <li>
                                                    <span className='fw-500 text-black fs-18'>{new Date().toLocaleTimeString()}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-body py-1">
                                            <ul className='d-flex justify-content-between align-items-center m-0 mb-2 p-0'>
                                                <li>
                                                    <p className='fw-700 fs-26 text-black m-0'>{Math.round(currentWeather.main.temp - 273.15)}°C</p>
                                                    <p className='fw-600 fs-20 text-capitalize text-ellipsis text-black m-0'>{currentWeather.weather[0]?.description}</p>
                                                </li>
                                                <li>
                                                    <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}.png`} alt={currentWeather.weather[0]?.description} title={currentWeather.weather[0]?.description} className='img-fluid' loading='lazy' />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-3 col-sm-4 col-6 mb-md-0 mb-3">
                                            <div className="card card-body h-100 d-flex flex-column justify-content-center align-items-center bg-secondary-1 rounded-4">
                                                <p className='m-0 mb-2 fw-500 fs-16'>{formatTime(currentWeather.sys.sunrise)}</p>
                                                <BsFillSunriseFill size={"40px"} style={{ color: "yellow" }} />
                                                <p className='m-0 fw-400 fs-15'>Sunrise</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-4 col-6 mb-md-0 mb-3">
                                            <div className="card card-body h-100 d-flex flex-column justify-content-center align-items-center bg-secondary-1 rounded-4">
                                                <p className='m-0 mb-2 fw-500 fs-16'>{formatTime(currentWeather.sys.sunset)}</p>
                                                <BsFillSunsetFill size={"40px"} style={{ color: "yellow" }} />
                                                <p className='m-0 fw-400 fs-15'>Sunset</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-4 col-6 mb-md-0 mb-3">
                                            <div className="card card-body h-100 d-flex flex-column justify-content-center align-items-center bg-secondary-1 rounded-4">
                                                <p className='m-0 mb-2 fw-500 fs-16'>{currentWeather.main.pressure} hPa</p>
                                                <SiSalesforce size={"40px"} style={{ color: "yellow" }} />
                                                <p className='m-0 fw-400 fs-15'>Pressure</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-4 col-6 mb-md-0 mb-3">
                                            <div className="card card-body h-100 d-flex flex-column justify-content-center align-items-center bg-secondary-1 rounded-4">
                                                <p className='m-0 mb-2 fw-500 fs-16 text-ellipsis'>{currentWeather.name}</p>
                                                <BiWorld size={"40px"} style={{ color: "yellow" }} />
                                                <p className='m-0 fw-400 fs-15'>Country</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        {/* tomorrow */}
                        <Tab eventKey="tomorrow" title="Tomorrow">
                            <div className="row">
                                <div className="col-md-4 mb-lg-0 mb-4">
                                    <div className="card rounded-3 bg-blue">
                                        <div className="card-header border-0">
                                            <ul className='p-0 m-0 d-flex justify-content-between align-items-center'>
                                                <li>
                                                    <p className='fw-500 text-black m-0 fs-18'>{formatDate(tomorrowForecast[0].dt)}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-body py-1">
                                            <ul className='d-flex justify-content-between align-items-center m-0 mb-2 p-0'>
                                                <li>
                                                    <p className='fw-700 fs-26 text-black m-0'>{Math.round(tomorrowWeather.temp - 273.15)}°C</p>
                                                    <p className='fw-600 fs-20 text-capitalize text-ellipsis text-black m-0'>{tomorrowForecast[0]?.weather[0]?.description}</p>
                                                </li>
                                                <li>
                                                    <img src={`http://openweathermap.org/img/wn/${tomorrowForecast[0]?.weather[0]?.icon}.png`} alt={tomorrowForecast[0]?.weather[0]?.description} title={tomorrowForecast[0]?.weather[0]?.description} className='img-fluid' loading='lazy' />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-3 col-sm-4 col-6 mb-md-0 mb-3">
                                            <div className="card card-body h-100 d-flex flex-column justify-content-center align-items-center bg-secondary-1 rounded-4">
                                                <p className='m-0 mb-2 fw-500 fs-16'>{formatTime(tomorrowForecast[0]?.sys?.sunrise || 0)}</p>
                                                <BsFillSunriseFill size={"40px"} style={{ color: "yellow" }} />
                                                <p className='m-0 fw-400 fs-15'>Sunrise</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-4 col-6 mb-md-0 mb-3">
                                            <div className="card card-body h-100 d-flex flex-column justify-content-center align-items-center bg-secondary-1 rounded-4">
                                                <p className='m-0 mb-2 fw-500 fs-16'>{formatTime(tomorrowForecast[0]?.sys?.sunset || 0)}</p>
                                                <BsFillSunsetFill size={"40px"} style={{ color: "yellow" }} />
                                                <p className='m-0 fw-400 fs-15'>Sunset</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-4 col-6 mb-md-0 mb-3">
                                            <div className="card card-body h-100 d-flex flex-column justify-content-center align-items-center bg-secondary-1 rounded-4">
                                                <p className='m-0 mb-2 fw-500 fs-16'>{tomorrowWeather.pressure} hPa</p>
                                                <SiSalesforce size={"40px"} style={{ color: "yellow" }} />
                                                <p className='m-0 fw-400 fs-15'>Pressure</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-4 col-6 mb-md-0 mb-3">
                                            <div className="card card-body h-100 d-flex flex-column justify-content-center align-items-center bg-secondary-1 rounded-4">
                                                <p className='m-0 mb-2 fw-500 fs-16 text-ellipsis'>{tomorrowWeather.name ? tomorrowWeather.name : "Nothing"}</p>
                                                <BiWorld size={"40px"} style={{ color: "yellow" }} />
                                                <p className='m-0 fw-400 fs-15'>Country</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        {/* Next-5-Days */}
                        <Tab eventKey="Next-5-Days" title="Next 5 Days">
                            <div className="row">
                                {nextFiveDaysForecast.map((day, index) => (
                                    <div key={index} className="col-lg-4 col-md-4  col-sm-6 col-12 mb-3">
                                        <div className="card rounded-3 bg-blue">
                                            <div className="card-header border-0">
                                                <ul className='p-0 m-0 d-flex justify-content-between align-items-center'>
                                                    <li>
                                                        <p className='fw-500 text-black m-0 fs-18'>{formatDate(day.dt)}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="card-body py-1">
                                                <ul className='d-flex justify-content-between align-items-center m-0 mb-2 p-0'>
                                                    <li>
                                                        <p className='fw-700 fs-26 text-black m-0'>{Math.round(day.main.temp - 273.15)}°C</p>
                                                        <p className='fw-600 fs-20 text-capitalize text-ellipsis text-black m-0'>{day.weather[0]?.description}</p>
                                                    </li>
                                                    <li>
                                                        <img src={`http://openweathermap.org/img/wn/${day.weather[0]?.icon}.png`} alt={day.weather[0]?.description} title={day.weather[0]?.description} className='img-fluid' loading='lazy' />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <div className="col-12">
                    <p className='p-0 fw-500 fs-16 '>Today's Overview</p>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-sm-6 col-6 mb-3">
                                    <div className="card px-sm-4 px-2 card-body h-100 rounded-3 bg-secondary-1 text-white">
                                        <p className='text-white m-0s fs-15'>Wind Status</p>
                                        <img src={wind} alt="wind" title='wind' loading='lazy' className='img-fluid p-2' />
                                        <ul className='d-flex m-0 mt-2 p-0 justify-content-between align-items-center'>
                                            <li>
                                                <p className='fs-15 m-0 fw-500'>{todayWeather.wind} <span className='fs-12 '>km/h</span></p>
                                            </li>
                                            <li>
                                                <span className='fs-12 '>{new Date(todayForecast[0]?.dt_txt).toLocaleTimeString()}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-6 mb-3">
                                    <div className="card px-sm-4 px-2 card-body h-100 rounded-3 bg-secondary-1 text-white">
                                        <p className='text-white m-0s fs-15'>Visibility</p>
                                        <img src={visibility} alt="Visibility" title='Visibility' loading='lazy' className='img-fluid p-2' />
                                        <p className='fs-15 text-center mt-2 m-0 fw-500'>{todayWeather.visibility / 1000} <span className='fs-12 '>km</span></p>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-6 mb-3">
                                    <div className="card px-sm-4 px-2 card-body h-100 rounded-3 bg-secondary-1 text-white">
                                        <p className='text-white m-0s fs-15'>UV Index</p>
                                        <img src={uv} alt="uv" title='uv' loading='lazy' className='img-fluid p-2' />
                                        <p className='fs-15  mt-2 m-0 fw-500'>{todayWeather.uvi}</p>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-6 mb-3">
                                    <div className="card px-sm-4 px-2 card-body h-100 rounded-3 bg-secondary-1 text-white">
                                        <p className='text-white m-0s fs-15'>Humidity</p>
                                        <img src={humidity} alt="humidity" title='humidity' loading='lazy' className='img-fluid p-2' />
                                        <p className='fs-15 text-center mt-2 m-0 fw-500'>{todayWeather.humidity} <span className='fs-12 '>%</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-md-block d-none">
                            <Link>
                                <img src={getStarted} alt="GetStarted" title='GetStarted' loading='lazy' className='img-fluid object-fit-cover rounded-2' />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SinglePage;
