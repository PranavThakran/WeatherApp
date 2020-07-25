import React,{ useState } from "react";

const api = {
  key:  process.env.REACT_APP_API_KEY,
  base: "http://api.openweathermap.org/data/2.5/"
}


function App() {

const [query , setQuery] = useState('');
const [weather , setWeather] = useState({});

const search = event => {
  if(event.key === "Enter") {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)

    .then(res => res.json())
    .then(result => {
      setWeather(result);
      setQuery('');
    });
  }
}

  const dateBuild = (d) => {
    let months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day=days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} , ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.weather[0].id <782 && weather.weather[0].id>700) ? 'app haze' :
     (weather.weather[0].id <300 && weather.weather[0].id>100) ? 'app thunder' :
     (weather.weather[0].id <623 && weather.weather[0].id>599) ? 'app snow' :
     (weather.weather[0].id <532 && weather.weather[0].id>499) ? 'app rain' :
     (weather.weather[0].id <806 && weather.weather[0].id>800) ? 'app clouds' :
     (weather.weather[0].id =800) ? 'app warm' :
     (weather.weather[0].id <322 && weather.weather[0].id>299) ? 'app drizzle' :
      'app'): 'app'}>

    <main>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Type a country,state,city...."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />

      </div>
      {(typeof weather.main !="undefined") ? (
      <div>
        <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuild(new Date())}</div>
        </div>
        <div className="weather-box">
         <div className="temp">{Math.round(weather.main.temp)}°C</div>
         <div className="flex-container">
           <div className="temp-min">Min: {Math.round(weather.main.temp_min)}°C</div>
           <div className="temp-max">Max: {Math.round(weather.main.temp_max)}°C</div>
         </div>
         <div className="flex-container">
           <div className="weather">{weather.weather[0].main}</div>
         </div>
         <div className="flex-container">
           <div className="desc">Description: {weather.weather[0].description}</div>
         </div>
        </div>
      </div>
      ) : ('')}
    </main>
    </div>
  );
}

export default App;
