import styled from "styled-components";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';


// Styled Components
const DailyTitle=styled.p`
   font-size: 20px;
   margin-top: 5px;
   height: 2%;
`
const DailyIcon=styled.div`
   color:#fff;
   display:flex;
   align-items:Center;
   justify-content:center;
   height: 30%;
   margin-top: 16px;
   width: 100%;
`
const DailyTemp=styled.div`
   display: flex;
   justify-content: space-between;
   height: 30%;
   width: 100%;
`
const DailyMinMax=styled.div`
   text-align:center;
   height: 100%;
   padding-bottom: 10px;
   width: 45%;
`
const TempTitle=styled.p`
   color:#B9B9B9;
   font-size: 9px;
   margin-top: -1px
   margin-bottom: 5px;
`
const DayTemp=styled.h6`
   font-size: 12px;
   font-weight: 500;
   margin-top: -9px;
`
const DailyWeather = styled.div`
   background-color: #2667F2;
   border-radius: 6px;
   cursor: pointer;
   display: flex;
   flex-direction:column;
   color: #fff;
   align-items:center;
   justify-content: space-evenly;
   height: 150px;
   margin-top: 50px;
   width: 120px;
   transition: all 0.5s ease;
   &:hover{
     transform: scale(1.1)
   },
  
`
const DailyReport=(props)=>{
    return(
     <DailyWeather>

         <DailyTitle>{props.day} {props.date}</DailyTitle>  
         
         <DailyIcon>
            { props.icon?<img src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="icon"/>:<WbSunnyOutlinedIcon style={{fontSize:"50px"}}/> }            
         </DailyIcon>

         <DailyTemp>

            <DailyMinMax>
              <TempTitle>Min</TempTitle>
              <DayTemp>{props.min}&deg;C</DayTemp>
            </DailyMinMax>

            <DailyMinMax>
               <TempTitle>Max</TempTitle>
               <DayTemp>{props.max}&deg;C</DayTemp>
            </DailyMinMax>

         </DailyTemp>

     </DailyWeather>
    )
}
export default DailyReport