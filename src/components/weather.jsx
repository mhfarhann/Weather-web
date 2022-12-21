import React from 'react'
import {useState } from 'react'

const Weather = ({onSubmit, cloudy, humidity, wind ,rain}) => {
  const [input , setInput] = useState('')

  const styles = {
    container : 'backdrop-blur-xl bg-gray-700/50 absolute h-screen float-right right-0 w-1/3',
    input: 'h-24 w-4/6 bg-transparent border-b-2 border-b-slate-600 ml-10 outline-0 pt-14',
    button: 'bg-orange-400 float-right h-24 w-1/6 grid place-content-center',
    citylistwrapper: 'border-b-2 border-b-slate-600 ml-10 mr-16 ',
    birminghamcity: 'pb-10 pt-10 text-left text-gray-300 cursor-pointer',
    citylist:'pb-10 text-left text-gray-300 cursor-pointer',
    weatherdetailwrapper: 'ml-10 mr-16 border-b-2 border-b-slate-600',
    weatherdetailheading: 'pb-10 pt-10 text-2xl text-white',
    weatherdetail:'flex justify-between',
    detail:'pb-10  text-left text-gray-300',
    stats:'text-white'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(input)
    setInput('')
  }

  return (
    <>
      <div className={styles.container}> 
          <form onSubmit={handleSubmit}>
          <input className={styles.input}
           value={input}
           placeholder='Search'
           onChange={(e) => setInput(e.target.value)}
           />
            <button className={styles.button}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-10 h-10 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            </button>
          </form>

            <div className={styles.citylistwrapper}>
                <p className={styles.birminghamcity} onClick={() => {onSubmit('Birmingham')}} >Birmingham</p>
                <p className={styles.citylist} onClick={() => {onSubmit('Manchester')}}>Manchester</p>
                <p className={styles.citylist} onClick={() => {onSubmit('New York')}}>New York</p>
                <p className={styles.citylist} onClick={() => {onSubmit('California')}}>California</p>
            </div>

            <div className={styles.weatherdetailwrapper}>
                <h1 className={styles.weatherdetailheading}>Weather Details</h1>
                <div className={styles.weatherdetail}>
                    <p className={styles.detail}>Cloudy</p>
                    <p className={styles.stats}>{cloudy}%</p>
                </div>
                <div className={styles.weatherdetail}>
                    <p className={styles.detail}>Humidity</p>
                    <p className={styles.stats}>{humidity}%</p>
                </div>
                <div className={styles.weatherdetail}>
                    <p className={styles.detail}>Wind</p>
                    <p className={styles.stats}>{wind}km/h</p>
                </div>
                <div className={styles.weatherdetail}>
                    <p className={styles.detail}>Rain</p>
                    <p className={styles.stats}>{rain ? `${rain}mm` : '0.00mm'}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Weather