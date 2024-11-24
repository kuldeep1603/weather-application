import React, { useEffect } from 'react'
// style 
import "./Dashboard.css";

// component
import Sidebar from '../../Components/Sidebar/Sidebar';
import SinglePage from '../Single_Page/SinglePage';

// redux toolkit 
import { FetchWeatherData } from '../../Apis/Slice/Data';
import { useDispatch, useSelector } from 'react-redux';



const Dashboard = () => {
    const dispatch = useDispatch();
    const weatherData = useSelector((state) => state.weather.weatherData);
    const query = useSelector((state) => state.weather.Searchvalue);

    useEffect(() => {
        try {
            if (query) {
                setTimeout(() => {
                    dispatch(FetchWeatherData(query));
                }, 500);
            }
        } catch (error) {
            console.log(error)
        }
    }, [dispatch, query]);

    return (
        <>
            <section className='section'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <SinglePage currentWeather={weatherData.current} forecastData={weatherData.forecast} />
                        </div>
                        <div className="col-lg-3">
                            <div className="row">
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard
