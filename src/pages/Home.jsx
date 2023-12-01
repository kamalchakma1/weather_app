import styled from "styled-components";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import DailyReport from "../components/DailyReport";
import { useState,useEffect } from "react";
import weatherVector from "../assets/images/3324647.jpg"
import { MobileView } from "../responsive.js";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: space-evenly;
  gap:; 10px;
  height: 85vh;
  margin: 5vh auto;
  width: 56vw;
  ${MobileView({width:"85vw",margin:"none"})};
`
const Search=styled.div`
  border: none;
  background-color:  rgba(128, 126, 227, 0.44);
  border-radius: 111px;
  display: flex;
  justify-content: space-between;
  padding:5px 20px;
  height: 40px; 
  width: 96%;  
  ${MobileView({width: "88%",height:"30px",marginTop:"80px"})}
`
const Input=styled.input`
  border: none;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.78);
  font-size: 30px;
  font-weight: 500;
  &:hover{
    outline:none;
  },
  &::placeholder {
    color:whitesmoke;
    font-size: 18px;
    padding-top: -50px;   
    ${MobileView({fontSize:"15px"})}
  },
  &:focus{
    outline:none;
  }
  width: 100%;
  ${MobileView({fontSize:"20px"})}
`
const Icon=styled.div`
  color: rgba(255, 255, 255, 0.78);
  cursor: pointer;
  display: flex;
  align-items:Center;
  justify-content: center;
  height: inherit;
  width: 40px;
`
const CurrentWeather=styled.div`
  color:#fff;
  display: flex;
  justify-content: space-between;
  height: 38vh;
  margin-top: 20px;
  width: 100%;
  ${MobileView({flexDirection:"column",width:"100%",gap:"10px"})}
`
const ReportBox1=styled.div`
  border-radius: 6px;
  background-color: #1746A9;
  cursor:pointer;
  height:inherit;
  padding: 20px;
  width: 50%;
  transition: all 0.5s ease;
  &:hover{
   transform: scale(1.1);
  }
  ${MobileView({width:"88%"})}
`
const City=styled.h3`
  font-size: 25px;
  font-weight: 500;
  margin-top: -2px;
  ${MobileView({marginLeft:"45px"})}
`
const WeatherDetails=styled.div`
  display: flex;
  justify-content: space-between;
  height: 200px;
  width: 100%;
  ${MobileView({flexDirection:"column",alignItems:"center"})}
`
const WeatherIcon=styled.div`  
  display: flex;
  font-size: 100px;
  align-items:center;
  justify-content:center;
  height: inherit;
  width: 35%;  
`
const WeatherReport=styled.div`
  display: flex;
  flex-direction:column;
  padding-left: 10px;
  height: inherit;
  width: 55%;
`
const Temp=styled.h2`
  font-size: 100px;
  font-weight: 500;
  margin-top: 0px;
  ${MobileView({fontSize:"60px",marginLeft:"20px"})}
`
const Condition=styled.span`
  margin-top: -80px;
  margin-left: 7px;
  ${MobileView({marginTop:"-60px",marginLeft:"23px"})}
`
const ReportBox2=styled.div`
  border-radius: 6px;
  cursor:pointer;
  background-color: #1746A9;
  display:flex;
  flex-direction:column;
  justify-content: space-evenly;
  height:inherit;
  padding: 20px;
  width: 30%;
  transition: all 0.5s ease;
  &:hover{
    transform: scale(1.1)
  }
  ${MobileView({width:"88%",height:"200px"})}
`
const Day=styled.div`
  display: flex;
  gap: 10px;
  margin-left: 30px;
  ${MobileView({marginTop:"20px"})}
`
const DailyReportContainer=styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 160px;
  width: 100%;
  ${MobileView({marginTop:"185px"})}
`
const Image=styled.img`
  height: 100px;
  object-fit:contain;
  width: 100px;
`
const WeatherIconContainer=styled.div`
  background-color:  #ffffff54;
  border-radius: 50%;
  display: flex;
  align-items:center;
  justify-content: center;
  height: 135px;
  margin-top: -32px;
  width: 135px;
  ${MobileView({height:"110px",width:"110px",marginTop:"5px"})}
`
const Message=styled.h3`
  font-weight: 400;
`
const DefaultMessage=styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  width: 100%;
`
const WeatherVec=styled.img`
  border-radius: 50%;
  object-fit: obtain;
  height: 180px;
  width: 180px;
`
function Home() {

  // STATES
  const[city,setCity] = useState("");
  const[country,setCountry] = useState("")
  const[lat,setLat]=useState("");
  const[lon,setLon]=useState("");
  const[currentCity,setCurrentCity]=useState("")
  const[currentCountry,setCurrentCountry]=useState("")
  const[currentTemp,setCurrentTemp]=useState("")
  const[weatherCondition,setWeatherCondition]= useState("")
  const[wind,setWind]=useState("")
  const[Humidity,setHumidity] = useState("")
  const[weatherIcon,setWeatherIcon] = useState("")
  const[minTemp,setMinTemp] = useState("")
  const[maxTemp,setMaxTemp] = useState("")

  // API_KEY
  const API_KEY=process.env.API_KEY||"1d665706796830aa099b4bbd455525b9";

  // Current Date
  const today=new Date()
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const todayDate=`${days[today.getDay()]} ${today.getDate()}-${months[today.getMonth()].slice(0,3)}-${today.getFullYear()}`

  // Get Weather Details - common functionality
  const getWeatherDeatils=(result)=>{
      setMinTemp(result.main.temp_min.toFixed(1))
      setMaxTemp(result.main.temp_max.toFixed(1))
      setWind(result.wind.speed)
      setCurrentTemp(Math.round(result.main.temp))
      setWeatherCondition(result.weather[0].description)
      setHumidity(result.main.humidity)
      setWeatherIcon(result.weather[0].icon)
  }

  // Common OpenWeatherMapAPI URL to get weahter details
  const getUrl=(latitude,longitude)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    return url;
  }

  // When page load first time this will execute
  useEffect(()=>{   
      if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition((position)=>{
         const getData=async()=>{
          try{
               await fetch(getUrl(position.coords.latitude,position.coords.longitude))
               .then((res)=>res.json())
               .then((result)=>{
                  getWeatherDeatils(result)
                  setCurrentCity(result.name); // for default weather
                  setCurrentCountry(result.sys.country) // for default weather
                })  
              }catch(error){
                 console.log(error)
             }
         }
         getData()
        })
      }else{
        alert("Please enable location.")
      }    
  },[])

  // Getting City coordinates i.e Latitude and Longitude when user enter a city name
  const getCity=async()=>{
    try{
        await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`)
        .then((res)=>res.json())
        .then((result)=>{
          setLat(result[0].lat)
          setLon(result[0].lon)
          setCountry(result[0].country)
        })
    }catch(error){
        console.log(error)
    }
  }

  // Calling getCity function when city name is entered
  useEffect(()=>{
    getCity()
  },[city])

  // Getting current Weather report
  const getWeather=async()=>{
    setCurrentCity(city)
    setCurrentCountry(country)
    try{
        await fetch(getUrl(lat,lon))
        .then((res)=>res.json())
        .then((result)=>{
           getWeatherDeatils(result)
           setCurrentCity(city);
           setCountry(result.sys.country)
        }) 
    }catch(error){
        console.log(error)
    }
  }

  return (
    <Container> 

        {/* SEARCH SECTION */}
        <Search>  
          <Icon>
            <SearchOutlinedIcon/>
          </Icon>
          <Input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter City Name"></Input>
          {
            city ?<Icon><CloseOutlinedIcon style={{fontSize:"18px",marginTop:"5px"}} onClick={()=>setCity("")}/></Icon>:null
          }         
          <Icon>|</Icon>
          <Icon onClick={getWeather} style={{marginRight:"10px"}}>Search</Icon>
        </Search>

        {/* CURRENT WEATHER SECTION */}
        <CurrentWeather>

          <ReportBox1>
            {currentCity?<City>{`${currentCity} , ${currentCountry}`}</City>:null}            
            {currentCity?<WeatherDetails>
              <WeatherIcon>
                <WeatherIconContainer>
                   <Image src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather Icon"/>
                </WeatherIconContainer>
              </WeatherIcon>
              <WeatherReport>
                {currentTemp?<Temp>{`${currentTemp}`}&deg;C</Temp>:null}                
                <Condition>{weatherCondition}</Condition>
              </WeatherReport>
            </WeatherDetails>:
            <DefaultMessage>
              <Message>Enter city name to know the weather</Message>
              <WeatherVec src={weatherVector}/>
            </DefaultMessage>
            }            
          </ReportBox1>

          <ReportBox2>
            <Day><CalendarTodayOutlinedIcon/>{todayDate}</Day>
            <Day><WaterDropOutlinedIcon/>{`Humidity  ${Humidity} %`}</Day>
            <Day><AirOutlinedIcon/>{`Wind   ${wind} m/s`} </Day>
          </ReportBox2>

        </CurrentWeather>

        {/* DAILY WEATHER SECTION */}
        <DailyReportContainer>
          <DailyReport day={days[today.getDay()]} date={today.getDate()} min={minTemp} max={maxTemp} icon={weatherIcon}/>      
          <DailyReport day="Tue" date="3"/>  
          <DailyReport day="Wed" date="4"/>      
          <DailyReport day="Thu" date="21"/>
          <DailyReport day="Fri" date="24"/>      
          <DailyReport day="Sat" date="30"/> 
        </DailyReportContainer>
          
    </Container>
  );
}

export default Home;
