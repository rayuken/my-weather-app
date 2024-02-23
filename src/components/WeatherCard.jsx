
const WeatherCard = ({ dw, index }) => {
    return (
        <div className=' border-[#e5539a3b] border-4  rounded-lg bg-[#4dc1e0] p-[10px] m-[20px] flex flex-col justify-center items-center animate-shake animate-once' key={index}>
            <div><img src={`http://openweathermap.org/img/w/${dw.weather[0].icon}.png`} alt="weather" /></div>
            <div>{dw.weather[0].description} <span className="text-sm">HR:{new Date(dw.dt).toLocaleTimeString()}</span></div>
            <div className='text-black'>Min: {dw.main.temp_max}&deg;C - Max:{dw.main.temp_max}&deg;C</div>
        </div>
    );
};

export default WeatherCard;