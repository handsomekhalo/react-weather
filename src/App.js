import './App.css';
import  {useState,useEffect} from 'react'
import axios from 'axios'



function App() {
    const [search, setSearch] = useState('');
    const[allData , setAllData] = useState(
      {
        city:'',
        country:'',
        temperature:'',
        humidity:'',
        min_temp: '',
        icons: ''

      }
    );

    useEffect(()=>{


      fetchData()
      //what we want to happen after rendering
      //fetch databse info the API call of weather
    } ,[])

    //fetch data with api key
    

    const fetchData = async(city)=>
    {

      //error handling

      try{
     
      const APIKEY ='51a6658f569b4831edabeb5412af932f';
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)

      await setAllData({
        city:result.data.name,
        country:result.data.sys.country,
        temperature:result.data.main.temp,
          humidity: result.data.main.humidity,
            min_temp: result.data.main.temp_min,
            icons: result.data.weather[0].icon
      })
       }catch(e)
       {
         console.log("API not loaded correctly or for the first time");
       }
    }

      const handleSubmit = (event) => {
        
        event.preventDefault();
        fetchData(search)
      }


    const searchHandler = (event) =>
    {
        setSearch(event.target.value)
    }
    
  


  return (

    <main>
    <div className="form">
    <form onSubmit={handleSubmit}>
      <input value={search} type="text" name='city' placeholder='Location' onChange={searchHandler}/>
      <button for='city'>Search</button>
    </form>
    <section>
    <div className="weather-div">
    <div className="data">
    <div>
    
   <div className='cityNames'>
    <img  src={'https://openweathermap.org/img/wn/'+ allData.icons +'@2x.png' } alt="weather icon"/>
     <h1 className='title'>{allData.city}</h1>
       <h2 className='location'>{allData.country}</h2>
   </div>
       
    <div className="weather-desc">
    <div>
   <h3>Temperature</h3>
     <p>{allData.temperature}°C</p>
    </div>
     <div>
         <h3>Humidity</h3>
       <p>{allData.humidity}%</p>
    </div>
     <div>
         <h3>Minimum Temperature</h3>
       <p>{allData.min_temp}°C</p>
    </div>
        
    </div>
        </div>
        </div>
  </div>
     </section>
    </div>
    </main>
  );

}

export default App;
