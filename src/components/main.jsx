import React from 'react'
import * as image from '../assets/imagess';
import * as svg from '../assets/icons'
import Weather from './weather'
import {useState , useEffect} from 'react'
import axios from 'axios'
import { DateTime } from "luxon";
import { nanoid } from 'nanoid'

const Main = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    onSubmit('jakarta')
  },[])

  const onSubmit = async (valueSearch) => {
   try{
    await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${valueSearch}&appid=${process.env.REACT_APP_ACCESS_KEY}&units=metric`)
    .then(response => {
      setData([response.data])
    })
   }
   catch(error){
    alert("City not found")
      console.log(error)
   }
  }

  const styles = {
    container : 'h-screen flex font-roboto',
    heading:'fixed text-white font-bold text-2xl  ml-40 mt-10',
    image:'object-cover w-screen h-screen',
    celciuswrapper:' fixed flex mt-80 bottom-0 ml-40 mb-10',
    celcius:'text-white font-extrabold text-[200px]',
    citywrapper:'flex flex-col justify-center ml-2 pt-14',
    city:'text-white font-semibold text-6xl pb-2',
    date:'text-white font-normal text-2xl',
    iconwrapper:'flex flex-col justify-center ml-4 pt-14',
    icon:'text-white font-semibold text-2xl pb-2',
    svg:'h-14 w-14',
    weather:'text-white font-semibold text-2xl text-center'
  }

  const changeBackgroundImage = (id) => {
    if(id >= 200 && id <= 232){
      return image.thunderstorm;
    }else if(id >= 300 && id <= 321){
      return image.drizzle
    }else if(id >= 500 && id <= 531){
      return image.rain
    }else if(id >= 600 && id <= 622){
      return image.snow
    }else if(id >= 701 && id <= 781){
      return image.atmosphere
    }else if(id === 800){
      return image.clear
    }else if(id >= 801 && id <= 804){
      return image.clouds
    }else{
      return image.default
    }
  };

  const currentDate = () => {
    const time = DateTime.now().toFormat(`T - cccc, dd LLL yy`)
    return time;
  }

  const changesvg = (id) => {
    if(id >= 200 && id <= 232){
      return svg.thunderstorm;
    }else if(id >= 300 && id <= 321){
      return svg.drizzle
    }else if(id >= 500 && id <= 531){
      return svg.rain
    }else if(id >= 600 && id <= 622){
      return svg.snow
    }else if(id >= 701 && id <= 781){
      return svg.atmosphere
    }else if(id === 800){
      return svg.clear
    }else if(id >= 801 && id <= 804){
      return svg.clouds
    }else{
      return null
    }
  };

  return (
    <div className={styles.container}>
            <p className={styles.heading}>Cuacane.</p>
    
               <img src={changeBackgroundImage(data[0]?.weather[0]?.id)} className={styles.image}/> 
                <div className={styles.celciuswrapper}>
                  <p className={styles.celcius}>{data[0] ? Math.round(data[0]?.main.temp) : '0'}°</p> 
                   <div className={styles.citywrapper}>
                      <p className={styles.city}>{data[0]?.name}</p>
                      <p className={styles.date}>{currentDate()}</p>
                   </div>
                    <div className={styles.iconwrapper}> 
                      <p className={styles.icon}><img src={data[0] ? changesvg(data[0]?.weather[0].id) : svg.atmosphere} className={styles.svg} key={nanoid()}/></p> 
                      <p className={styles.weather}>{data[0]?.weather[0].main}</p>
                    </div>
               </div>

        <Weather
         onSubmit={onSubmit}
         cloudy={data[0]?.clouds.all}
         humidity={data[0]?.main?.humidity}
         wind={data[0]?.wind?.speed}
         rain={data[0]?.rain?.['1h']}
        />
    </div>
  )
}

export default Main
