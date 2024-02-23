import { Button } from "react-bootstrap";
import WeatherCard from "./WeatherCard";

const WeatherContainer = ({ forecastWeather, showForecastMap, handleHideDetails, handleSeeDetails }) => {
    return (
        forecastWeather.map(forecast => (
            <div className='bg-[#8bc34a] min-h-[150px] m-[4rem] pb-2 rounded-3xl animate-jump-in animate-once' key={forecast[0]}>
                <div className='flex flex-row p-4 w-full text-white text-center justify-center bg-[#ec358d] min-h-[40px] rounded-t-3xl'>
                    <div className=''><h4>{forecast[0]}</h4></div>
                    <div className='ml-4'>
                        {showForecastMap[forecast[0]] ?
                            <Button variant='outline-light' onClick={() => handleHideDetails(forecast[0])}>Hide details</Button>
                            : <Button onClick={() => handleSeeDetails(forecast[0])} variant='outline-light'>See details</Button>}
                    </div>
                </div>
                {showForecastMap[forecast[0]] &&
                    forecast[1].map((dw, index) => {
                        return (
                            <WeatherCard key={`container-${index}`} dw={dw} index={index} />
                        )
                    })
                }
                {!showForecastMap[forecast[0]] &&
                    <div onClick={() => handleSeeDetails(forecast[0])} className='text-gray-500 cursor-pointer border-[#e5539a3b] border-4  rounded-lg bg-[#48689685] p-[10px] m-[20px] flex flex-col justify-center items-center hover:bg-white'>
                        <h6>Wanna see more?</h6>
                    </div>
                }
            </div>
        ))
    );
};

export default WeatherContainer;