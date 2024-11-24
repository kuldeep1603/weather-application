import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// base url and api key 
export const apiKey = `${process.env.REACT_APP_API_KEY}`;
export const BaseUrl = `https://api.openweathermap.org/data/2.5`;

// fetch data fun 
export const FetchWeatherData = createAsyncThunk("FetchWeatherData", async (city) => {
    const currentWeatherResponse = await fetch(`${BaseUrl}/weather?q=${city}&appid=${apiKey}`);
    const currentWeatherData = await currentWeatherResponse.json();
    const { lat, lon } = currentWeatherData.coord;
    const forecastResponse = await fetch(`${BaseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const forecastData = await forecastResponse.json();
    return {
        current: currentWeatherData,
        forecast: forecastData
    };
});

// initialState data 
const initialState = {
    Searchvalue: "Mumbai",
    SearchHistory: JSON.parse(localStorage.getItem('Search')) || [], // Initialize as an empty array
    IsLoading: false,
    IsError: false,
    weatherData: {
        current: {},
        forecast: {}
    },
    Fav: JSON.parse(localStorage.getItem('FavCity')) || [],
    email: null,
};

// slice 
const Data = createSlice({
    name: "FetchData",
    initialState,
    reducers: {
        // Search 
        SetSearchValue: (state, action) => {
            state.Searchvalue = action.payload;
            if (!state.SearchHistory.includes(action.payload)) {
                state.SearchHistory = [...state.SearchHistory, action.payload];
                localStorage.setItem('Search', JSON.stringify(state.SearchHistory));
            }
        },
        // add to fav 
        SetFav: (state, action) => {
            state.Fav.push(action.payload);
            localStorage.setItem('FavCity', JSON.stringify(state.Fav));
        },
        // remove from fav 
        SetRemoveFav: (state, action) => {
            state.Fav.splice(action.payload.id, 1);
            localStorage.setItem('FavCity', JSON.stringify(state.Fav));
        },
        setUser(state, action) {
            state.email = action.payload.email;
        },
    },
    // data fetching 
    extraReducers: (builder) => {
        builder.addCase(FetchWeatherData.pending, (state, action) => {
            state.IsLoading = true;
            state.IsError = false;
        });
        builder.addCase(FetchWeatherData.fulfilled, (state, action) => {
            state.IsLoading = false;
            state.IsError = false;
            state.weatherData = action.payload;
        });
        builder.addCase(FetchWeatherData.rejected, (state, action) => {
            state.IsLoading = false;
            state.IsError = true;
        });
    }
});

export const { SetSearchValue, SetFav, SetRemoveFav, setUser } = Data.actions;
export default Data.reducer;
