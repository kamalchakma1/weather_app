import styled from "styled-components";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import DailyReport from "../components/DailyReport";
import { useState,useEffect } from "react";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: space-evenly;
  gap:; 10px;
  height: 85vh;
  margin: 5vh auto;
  width: 56vw;
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
  &:focus{
    outline:none;
  }
  width: 100%;
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
   transform: scale(1.1)
  }
`
const City=styled.h3`
  font-size: 25px;
  font-weight: 500;
  margin-top: -2px;
`
const WeatherDetails=styled.div`
  display: flex;
  justify-content: space-between;
  height: 200px;
  width: 100%;
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
`
const Condition=styled.span`
  margin-top: -80px;
  margin-left: 7px;
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
`
const Day=styled.div`
  display: flex;
  gap: 10px;
  margin-left: 30px;
`
const DailyReportContainer=styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 160px;
  width: 100%;
`
function Home() {
  const[city,setCity] = useState(null);
  const[lat,setLat]=useState(null);
  const[lon,setLon]=useState(null);



  // GET city latitide and longitutde

  const getWeather=()=>{
    if(city){
      alert("Weather Details")
    }else{
      alert("Please Enter City Name")
    }   
  }
  return (
    <Container>  

        {/* SEARCH SECTION */}
        <Search>  
          <Icon>
            <SearchOutlinedIcon/>
          </Icon>
          <Input value={city} onChange={(e)=>setCity(e.target.value)}></Input>
          {
            city ?  <Icon>
            <CloseOutlinedIcon style={{fontSize:"18px",marginTop:"5px"}} onClick={()=>setCity("")}/>
          </Icon>:null
          }         
          <Icon>|</Icon>
          <Icon onClick={getWeather} style={{marginRight:"10px"}}>
            Search
          </Icon>
        </Search>

        {/* CURRENT WEATHER SECTION */}
        <CurrentWeather>
          <ReportBox1>
            <City>Bengaluru,IN</City>
            <WeatherDetails>
              <WeatherIcon>
                <WbSunnyOutlinedIcon style={{fontSize:"140px"}}/>
              </WeatherIcon>
              <WeatherReport>
                <Temp>26&deg;C</Temp>
                <Condition>Partialy Cloud</Condition>
              </WeatherReport>
            </WeatherDetails>
          </ReportBox1>
          <ReportBox2>
            <Day><CalendarTodayOutlinedIcon/>Monday 30-Nov-2023</Day>
            <Day><WaterDropOutlinedIcon/>Humidity 90%</Day>
            <Day><AirOutlinedIcon/>Wind 45Km/h </Day>
          </ReportBox2>
        </CurrentWeather>

        {/* DAILY WEATHER SECTION */}
        <DailyReportContainer>
          <DailyReport day="Mon" date="2"/>      
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
