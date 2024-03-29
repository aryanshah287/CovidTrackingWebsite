import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import "leaflet/dist/leaflet.css";
import LineGraph from './LineGraph';
function App() {

  const [countries, setCountries]= useState([]);
  const [country, setCountry]= useState('worldwide') //sets worldwide as default
  const [countryInfo,setCountryInfo]= useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter] =
  useState({lat :15.4542, lng:18.7322});
  const [mapZoom,setMapZoom] = useState(2.5);
  const [mapCountries, setMapCountries]=useState([]);

  //state = how to write a variable in react
  //USEEFFECT = runs a piece of code based on a condition
  // ......
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data =>{
      setCountryInfo(data);
    })
  },[]);


  useEffect(() => {
      //the code here will run once when component loads 
      //or countries variable changes 
      //if [] --> once
      const getCountriesData= async()=>{
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response)=>response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }
          ));
          const sortedData=sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
      });
    };

    getCountriesData();
  },[]);

  const onCountryChange= async(event) =>{
    const countryCode=event.target.value;

    console.log("Yoooo >>>",countryCode);

    setCountry(countryCode);

    const url= countryCode=='worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)

    .then(response=>response.json())
    .then(data=>{
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        
        setMapZoom(4);
        
    });

    //back tick( ` ) allows to include javascript in '' 
  };
  console.log("Country Info ",countryInfo)
  return (
    <div className="app">
      <div className='app_left'>
          <div className='app_header'>
            <h1>Covid 19 Tracker by Deepansha</h1>
            <FormControl className='app_dropdown'>
              <Select variant='outlined' value={country} onChange={onCountryChange}>
                {/*Parnthesis allow to to write js in HTML JSX=HTML + JS*/}
                  <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (

                      <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))}
                  
              </Select>
            </FormControl>
            </div>
      <div className='app_stats'>
                <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
                <InfoBox title="Recovered" cases={countryInfo.todayDeaths} total={countryInfo.recovered}/>
                <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
      </div>
            <Map
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
            />
      </div>
            {/*Graph*/}
            <Card className='app_right'>
              <CardContent>
                  <h3>Live cases by country</h3>
                  <Table countries={tableData}/>
                  <h3>Worldwide new cases</h3>
                  <LineGraph/>
              </CardContent>
            </Card>
    </div>
      
  );
}

export default App;
